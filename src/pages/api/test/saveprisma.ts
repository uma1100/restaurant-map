import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "twitter-api-sdk";
import { db } from "@/lib/database";
import { Restaurnat } from "@prisma/client";
import { responseGPT } from "@/lib/gpt";
import { create } from "domain";

export interface media {
  media_key: string;
  url: string[];
  type: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const imageUrl = {
    url: "https://example.com/images/ramen.jpg",
  }
  const imageUrls = ["url", "url"];
  const convertedImageUrls = imageUrls.map((url) => ({ url }));
  console.log(convertedImageUrls);
  await db.restaurant.create(
    {
      data: {
        name: "ラーメン屋",
        prefecture: "東京都",
        station: "新宿駅",
        tweetText: "新宿に美味しいラーメン屋を見つけました。",
        tweetId: "1234567890aaa",
        userName: "taro",
        userId: "1234567890",
        imageUrl: {
          create: convertedImageUrls,
        },
        imageUrlInTweetCard: "https://example.com/images/ramen.jpg",
      },
    }
  );

  return res.status(200).json({ message: "ok" });

}