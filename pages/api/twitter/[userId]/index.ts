import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { db } from "lib/database";
import { Restaurnat } from "@prisma/client";
import { responseGPT } from "lib/gpt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
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
  const tweets = await client.tweets.usersIdTweets(data.id, { exclude: ["retweets", "replies"], });

  // save planetscale
  if (!tweets.data) {
    res.status(404).json({ message: "User tweets not found" });
    return;
  }
  for (const tweet of tweets.data) {
    const responseChatGPT = await responseGPT(tweet.text);
    console.log(responseChatGPT);
    if (responseChatGPT.name === null || responseChatGPT.prefecture === null || responseChatGPT.station === null) {
      continue;
    }
    await db.restaurnat.create({
      data: {
        name: responseChatGPT.name,
        prefecture: responseChatGPT.prefecture,
        station: responseChatGPT.station,
        tweetText: tweet.text,
        tweetId: tweet.id,
        userName: data.name,
        userId: userId as string,

      }
    })
  }

  res.status(200).json({ name: data, tweets: tweets, date: today.toISOString() });

}