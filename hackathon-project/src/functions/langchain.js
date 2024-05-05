import axios from "axios";

import { OpenAI } from "@langchain/openai";

//variable declared to hold OpenAI's API key stored in env variable.
//then use langchain to manage OpenAI's LLM by creating a new instance of the class using the API key
//this allows use to pass data through and recieve a response using invoke method

// const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// const llm = new OpenAI({
//   openAIApiKey: apiKey,
// });

export async function getAnswer(question) {
  let answer =
    "Should return an Answer - Need to replace key ChatGPT Key - IF key is expose, key will become invalid?";
  try {
    // answer = await llm.invoke(question);

    const object = { question: question };

    const response = await axios.post(
      "http://localhost:8000/api/openAi",
      object
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.error(e);
    return "Need to Replace key";
  }
}
