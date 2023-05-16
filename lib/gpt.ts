import { Configuration, OpenAIApi } from 'openai';

interface APIResponse {
  prefecture: string | null;
  station: string | null;
  name: string | null;
}

interface OpenAPIResponse {
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

export const responseGPT = async (message: string): Promise<APIResponse> => {
  const gptContent = message + "\n" + "上記のテキストをjson形式で県名(key=prefecture)と駅名(key=station)と店名(key=name)を推測してください。含まれていない場合はnullで返してください。";

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
    const data = completion.data as OpenAPIResponse;
    // GPTの返答を取得
    return (JSON.parse(data.choices[0].message.content) as APIResponse);
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    console.error(error.response.status, error.response.data);
    return (error.response.data);
  }
}
