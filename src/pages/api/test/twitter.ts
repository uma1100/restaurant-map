import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { db } from "@/lib/database";
import { Restaurnat } from "@prisma/client";
import { responseGPT } from "@/lib/gpt";

export interface media {
  media_key: string;
  url: string[];
  type: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  console.log(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(process.env.DATABASE_URL);


  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  const { data } = await client.users.findUserByUsername(userId as string);
  if (!data) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  // const tweets = await client.tweets.usersIdTweets(data.id, { start_time: today.toISOString(), exclude: ["retweets","replies"], });
  const tweets = await client.tweets.usersIdTweets(data.id, { exclude: ["retweets", "replies"], expansions: ["attachments.media_keys"], "media.fields": ["url"] });

  // save planetscale
  if (!tweets.data) {
    res.status(404).json({ message: "User tweets not found" });
    return;
  }

  for (const tweet of tweets.data) {
    const imageUrl: (string[] | null)[] | null = tweet.attachments?.media_keys ? tweet.attachments?.media_keys.map((mediaKey) => {
      const media = tweets.includes?.media?.find((media) => media.media_key === mediaKey) as media;
      return media?.url ? media?.url : null;
    }) : null;
    if (imageUrl === null) {
      continue;
    }
    console.log(imageUrl[0]);
  }
  res.status(200).json({ name: data, tweets: tweets, date: today.toISOString() });

}