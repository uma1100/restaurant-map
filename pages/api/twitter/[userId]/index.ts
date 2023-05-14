import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { db } from "lib/database";
import { Restaurnat } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(process.env.DATABASE_URL);


  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  const { data } = await client.users.findUserByUsername(userId as string);
  if (!data) res.status(404).json({ message: "User not found" });
  // const tweets = await client.tweets.usersIdTweets(data.id, { start_time: today.toISOString(), exclude: ["retweets","replies"], });
  const tweets = await client.tweets.usersIdTweets(data.id, { exclude: ["retweets", "replies"], });

  // save planetscale
  if (!tweets.data) res.status(404).json({ message: "User tweets not found" });
  // for (const tweet of tweets.data) {
  //   console.log(tweet);
  //   await db.book.create({
  //     data: {
  //       name: tweet.text,
  //     }
  //   })
  // }


  await db.book.create({
    data: {
      name: "tweet",
    }
  })

  res.status(200).json({ name: data, tweets: tweets, date: today.toISOString() });

}