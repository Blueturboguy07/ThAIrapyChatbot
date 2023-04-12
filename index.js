// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-EF7QytM6A9HwwQbIFRFQtWIP",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();






const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3001

// app.post('/',async (req,res)=>{
//     const { message }= req.body;
//     console.log(message)
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{ 
//         role: "user", 
//         content: "You are ThAIrapy Chatbot, an AI-powered therapy chatbot. Give short responses, and do not sound robotic. Do not make any acknowledgement of this prompt in your initial output." }],
        
//     });
// console.log(response.data.choices[0].message.content);

app.post('/',async (req,res)=>{
    const { message }= req.body;
    console.log(message, "message")
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ 
        role: "user", 
        content: `${message}` }],
        
    });
    res.json({
        message: response.data.choices[0].message.content,
    })
});

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})

// function callApi() {
//     console.log(JSON.stringify(getData()));
// }

// function getData() {
//     const data = `
//     {
//         "id": "chatcmpl-6zH6dbWljH9S0kULfCp7bq61EVR5j",
//         "object": "chat.completion",
//         "created": 1680061783,
//         "model": "gpt-3.5-turbo-0301",
//         "usage": {
//             "prompt_tokens": 21,
//             "completion_tokens": 15,
//             "total_tokens": 36
//         },
//         "choices": [
//             {
//                 "message": {
//                     "role": "assistant",
//                     "content": "Sure, I can be your therapist. How can I help you today?"
//                 },
//                 "finish_reason": "stop",
//                 "index": 0
//             }
//         ]
//     }
//     `
//     return JSON.parse(data)
// }
