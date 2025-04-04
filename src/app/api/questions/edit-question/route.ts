import { db } from "@/lib/primsadb";
import { apiResponse, handleApiError } from "@/lib/api-utils";
import { createUserContent } from "@google/genai";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { questionId, title, content, tags, userId, oldTags } =
      await req.json();

    const question = await db.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        author: true,
      },
    });
    if (!question) {
      return apiResponse("Question not found", false, 404, null);
    }
    if (userId !== question.author.id) {
      return apiResponse(
        "You are not authorized to edit this question",
        false,
        403,
        null
      );
    }
    const updatedQuestion = await db.question.update({
      where: {
        id: questionId,
      },
      data: {
        title,
        content,
        tags,
      },
    });
``
    const newTags = tags.filter((tag: string) => !oldTags.includes(tag));
    const removedTags = oldTags.filter((tag: string) => !tags.includes(tag));

    // decrement the question count of the removed tags and if the question count is 0 then delete the tag
    if (removedTags.length > 0) {
      for (const tag of removedTags) {
        const tagExists = await db.tag.findUnique({
          where: {
            title: tag
          },
        });
        console.log("Tag Exists", tagExists);
        if (tagExists  && tagExists.questions <= 1) {
          await db.tag.delete({
            where: {
              id: tagExists.id,
            },
          });
        } else {
          await db.tag.update({
            where: {
              id: tagExists?.id as string,
            },
            data: {
              questions: {
                decrement: 1,
              },
            },
          });
        }
      }
    }

    // now if a new tag is add we need to create a new tag or increment the question count of the tag if it exists and also decrement the count of the tag if it is removed also use genai to generate a tag summary
    if (newTags.length > 0) {
      for (const tagTitle of newTags) {
        const tagExists = await db.tag.findFirst({
          where: {
            title: tagTitle,
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

    return apiResponse(
      "Question updated successfully",
      true,
      200,
      updatedQuestion
    );
  } catch (error) {
    return handleApiError(error);
  }
}
