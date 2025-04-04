import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";
import { createUserContent, GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    // Create the question
    //const question = await Question.create(data);
    const question = await db.question.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.author,
        tags: data.tags,
      },
    });
    if (question) {
      // Process tags sequentially to avoid race conditions
      for (const tagTitle of data.tags) {
        const tagExists = await db.tag.findFirst({
          where: {
            title: {
              equals: tagTitle,
            },
          },
        });

        if (tagExists) {
          // If tag exists, increment questions count
          await db.tag.update({
            where: {
              id: tagExists.id,
            },
            data: {
              questions: {
                increment: 1, // Increments the "questions" field by 1
              },
            },
          });
        } else {
          // Generate a description using Forefront AI
          const genAI = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY!,
          });

          const prompt = `
      Generate a short description for a tag.
      The tag is: ${tagTitle}
      the tag description should be of 100 words
      Respond with an object of the following format:
      {
        "description": "short description of the tag"
      }
    `;

          // Get response from Gemini
          const result = await genAI.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [createUserContent([prompt, tagTitle])],
          });

          // Extract response text safely
          const textResponse =
            result?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!textResponse) {
            return apiResponse("Invalid response from AI", false, 500, null);
          }
          if (!textResponse) {
            await db.question.delete({
              where: {
                id: question.id,
              },
            });
            return apiResponse("Invalid response from AI", false, 500, null);
          }
          // Clean JSON response
          const cleanedText = textResponse.replace(/```json|```/g, "").trim();
          const parsedText = JSON.parse(cleanedText);

          await db.tag.create({
            data: {
              title: tagTitle,
              questions: 1,
              description: parsedText.description,
            },
          });
        }
      }
    }

    return apiResponse("Question created successfully", true, 201, question);
  } catch (error) {
    return handleApiError(error);
  }
}
