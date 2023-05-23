import TwitterAccordion from '@/components/TwitterAccordion';
import { db } from '@/lib/database';

const getRestaurants = async (userId: string) => {
  const posts = await db.restaurnat.findMany({
    where: { userId: userId },
  });
  if (!posts.length) throw new Error('Posts not found');
  return posts;
};

export default async function Article({ params }: { params: { userId: string } }) {
  const restaurants = await getRestaurants(params.userId);
  return (
    <div className="md:w-3/5 mx-auto">
      {restaurants.map((restaurant) => (
        <>
          <div
            key={restaurant.id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-1"
          >
            {restaurant.imageUrl && <img className="object-cover w-full rounded-t-lg h-48 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={restaurant.imageUrl} alt="" />}
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{restaurant.name}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">最寄り駅：{restaurant.station}</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">概要：{restaurant.tweetText}</p>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                >
                  地図で見る
                </a>
                <TwitterAccordion {...restaurant} />
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
