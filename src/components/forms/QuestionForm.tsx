"use client";
import Editor from "@/components/editor";
import Tag from "@/components/Reusable/Tag";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { normalizeTag } from "@/lib/utils";
import { questionSchema } from "@/lib/zod-validation-schemas";
import { ExtendedQuestion } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

const QuestionForm = ({
  id,
  question,
}: {
  id?: string;
  question?: ExtendedQuestion;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {data:session} = useSession();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags || [],
    },
  });

  

  const handleSubmit = async (data: z.infer<typeof questionSchema>) => {
    setIsLoading(true);
    const userId = id;
    try {
      let res;
      if (!question) {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/questions/ask-question`,
          {
            title: data.title,
            content: data.content,
            tags: data.tags,
            author: userId,
          }
        );
      } else {
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/questions/edit-question`,
          {
            questionId: question?.id,
            title: data.title,
            content: data.content,
            tags: data.tags,
            userId: session?.user?.id,
            oldTags: question.tags,
          }
        );
      }
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        router.push(routes.question_details(res.data.data.id));
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Question Submission Failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputTags = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = normalizeTag(e.currentTarget.value)
        .trim()
        .toLowerCase()
        .replace(/\./g, ""); // Remove dots

      // check if the tags are greater than 3
      if (field.value.length >= 3) {
        form.setError("tags", {
          type: "manual",
          message: "You can only add up to 3 tags",
        });
        return;
      }

      // check if the length is greater than 15
      if (tagInput.length > 30) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 30 characters",
        });
        return;
      }
      // check if it is already included or not
      if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      } else {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      }
    }
  };

  const handleRemoveTag = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter(
      (val) => val.toLocaleLowerCase().trim() !== tag.toLocaleLowerCase().trim()
    );

    form.setValue("tags", newTags);
    form.clearErrors("tags");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel>
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type={"text"}
                  {...field}
                  className="paragraph-regular bg-light-800 dark:bg-dark-300  text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 border-0"
                />
              </FormControl>
              <FormDescription>
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MDX Editor */}
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel>
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor value={field.value} fieldChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags Field */}
        <FormField
          control={form.control}
          name={"tags"}
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2.5">
              <FormLabel>
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    type={"text"}
                    onKeyDown={(e) => handleInputTags(e, field)}
                    className="paragraph-regular bg-light-800 dark:bg-dark-300 light-border-2 text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 border-0 mb-4"
                  />
                  <div className="flex gap-6">
                    {field.value.length > 0 &&
                      field.value.map((tag, i) => (
                        <Tag
                          tag={tag}
                          key={i}
                          icon={true}
                          remove={true}
                          handleRemove={() => handleRemoveTag(tag, field)}
                        />
                      ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="rounded-lg w-[173px] h-[45px] primary-gradient flex-center paragraph-semibold text-white mt-[64px] ml-auto gap-4"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <ReloadIcon className="w-4 h-4 animate-spin" />}
          {isLoading
            ? "Submitting"
            : question
              ? "Edit Question"
              : " Submit Question"}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
