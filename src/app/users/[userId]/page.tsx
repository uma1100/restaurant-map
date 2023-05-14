import { db } from 'lib/database';

export default async function Article({ params }: { params: { userId: string } }) {
  const posts = await db.book.findMany();
  console.log(posts);
  return (
    <div>
      <h1>記事の詳細</h1>
      <p>記事のスラッグ: {params.userId}</p>
    </div>
  );
}
