import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";
import './loadEnv.mjs'
async function example() {
    const api = new ChatGPTAPI({
        apiKey: process.env.CHAT_GPT_API_KEY
    })

    const res = await api.sendMessage('Hello World!')
    console.log(res.text)
}


async function example2() {
    console.log('hello');

    const api = new ChatGPTUnofficialProxyAPI({
        accessToken: process.env.OPENAI_ACCESS_TOKEN,
        apiReverseProxyUrl: CHAT_GPT_REVERSE_PROXY_SITE
    })

    const res = await api.sendMessage('Hello World!');
    console.log('res',res)
}