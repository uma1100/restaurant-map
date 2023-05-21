import { db } from 'lib/database';

const getRestaurants = async (userId: string) => {
  const posts = await db.restaurnat.findMany({
    where: { userId: userId },
  });
  if (!posts.length) throw new Error('Posts not found');
  return posts;
};

export default async function Article({ params }: { params: { userId: string } }) {
  const restaurants = await getRestaurants(params.userId);
  console.log(restaurants);
  return (
    <div className="justify-center flex">
      <ol className="relative border-l border-gray-200 dark:border-gray-700 w-3/5">
        {restaurants.map((restaurant) => (
          <li className="ml-6 my-10 justify-center" key={restaurant.id}></li>
        ))}
      </ol>
    </div>
  );
}
