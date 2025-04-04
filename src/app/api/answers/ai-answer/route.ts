import { db } from "@/lib/primsadb";
import { GoogleGenAI } from "@google/genai";
import { apiResponse, handleApiError } from "@/lib/api-utils";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { questionId, authorId } = await req.json();

    // Get the question from the database
    const question = await db.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return apiResponse("Question not found", false, 404);
    }

    // Format the question content
    const formattedQuestion = question.content
      .replace(/\\/g, "")
      .replace(/#x20/g, "");

    const dummyResponse = `JavaScript uses a **single-threaded** model, meaning it can only execute one task at a time. However, it can handle asynchronous tasks using the **event loop**. The event loop continuously checks the **call stack** and the **task queue**. If the call stack is empty, it picks up tasks from the queue and executes them.

\`\`\`js
console.log("Start"); // (1)
setTimeout(() => {
  console.log("Inside setTimeout"); // (4)
}, 0);
Promise.resolve().then(() => console.log("Inside Promise")); // (3)
console.log("End"); // (2)
\`\`\``;

    // Generate answer using Google's Generative AI
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate an Answer for the "${formattedQuestion}"
              you will be answering for a question releated to programming similar to stack overflow. it can also inlcude code blocks and images if needed. i will be using mdx editor in next js so please return a response that not causes any errors ... 
              here is an example of the output i expect : ${dummyResponse}
            `,
            },
          ],
        },
      ],
    });

    const responseMessage =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    // Create the answer in the database
    const answer = await db.answer.create({
      data: {
        content: responseMessage as string,
        authorId,
        questionId,
      },
    });

    // Update the question to include the new answer
    await db.question.update({
      where: { id: questionId },
      data: {
        answers: {
          connect: { id: answer.id },
        },
      },
    });

    return apiResponse("Answer Generated", true, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
