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
    <div>
      <h1>記事の詳細</h1>
      <p>記事のスラッグ: {params.userId}</p>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>

      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="w-8 h-8 rounded-full" src="" alt="Neil image" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Neil Sims</p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">email@windster.com</p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
