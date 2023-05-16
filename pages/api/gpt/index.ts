import axios, { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

interface Message {
  role: string;
  content: string;
}

interface APIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  const { tweetText, userName, userId } = req.body;
  const gptContent = tweetText + "\n" + "上記のテキストをjson形式で県名(key=prefecture)と駅名(key=station)と店名(key=name)を抽出してください。含まれていない場合はnullで返してください。";

  try {
    // 設定を諸々のせてAPIとやり取り
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        "role": "user",
        "content": gptContent
      }],
      temperature: 0.9,
      max_tokens: 100,
    });
    // GPTの返答を取得
    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }

}
