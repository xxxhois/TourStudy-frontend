import { OpenAI } from "openai";
import axios from 'axios';

const generateDiary = async (prompt, input) => {
    const data = JSON.stringify({
        messages: [
            {
                content: "You are a helpful assistant writer",
                role: "system"
            },
            {
                content: prompt+input,
                role: "user"
            }
        ],
        model: "deepseek-chat",
        frequency_penalty: 0,
        max_tokens: 2048,
        presence_penalty: 0,
        stop: null,
        stream: false,
        temperature: 1,
        top_p: 1,
        logprobs: false,
        top_logprobs: null
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.deepseek.com/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer sk-5903c683f6e5475e8132124907f4ef55'
        },
        data: data
    };
//print(response.choices[0].message.content)
    try {
        const markdownToHtml = (markdown) => {
            // Use a library or write your own code to convert markdown to HTML
            // For example, you can use the 'marked' library:
            // const marked = require('marked');
            // const html = marked(markdown);
            // return html;

            // Alternatively, you can write your own code to convert markdown to HTML
            // Here's a simple example using regular expressions:
            let html = markdown.replace(/# (.+)/g, '<h1>$1</h1>');
            html = html.replace(/## (.+)/g, '<h2>$1</h2>');
            html = html.replace(/### (.+)/g, '<h3>$1</h3>');
            html = html.replace(/#### (.+)/g, '<h4>$1</h4>');
            html = html.replace(/##### (.+)/g, '<h5>$1</h5>');
            html = html.replace(/###### (.+)/g, '<h6>$1</h6>');
            html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
            html = html.replace(/`(.+?)`/g, '<code>$1</code>');
            html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
            html = html.replace(/\n/g, '<br>');
            return html;
        };

        const response = await axios(config);
        const diary = response.data.choices[0].message.content;
        const html = markdownToHtml(diary);
        console.log(html);
        return html;
    } catch (error) {
        console.log(error);
    }
};

const parsingPrompt = ()=>{

}

export { generateDiary, parsingPrompt };