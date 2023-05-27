import { Book } from "@prisma/client";
import { db } from "@/lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Book[]>) {
  // const books = await prisma.book.findFirst();
  // console.log(books);
  const tables = await db.book.findMany();
  console.log(tables);
  res.status(200).json(tables);
}