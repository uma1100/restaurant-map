import { responseBard } from '@/lib/bard';
import axios, { AxiosRequestConfig } from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  const { message } = req.body;
  await console.log(message);

  try {
    // 設定を諸々のせてAPIとやり取り
    const response = await responseBard(message);
    await console.log(response);
    // GPTの返答を取得
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    // Consider adjusting the error handling logic for your use case
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
  }

}
