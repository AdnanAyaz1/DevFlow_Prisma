"use client";
import { AnswerSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const AnswerForm = ({
  authorId,
  questionId,
}: {
  authorId: string;
  questionId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false); // AI loading state

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: { content: "" },
  });

  const handleSubmit = async (data: z.infer<typeof AnswerSchema>) => {
    if (!authorId) {
      toast({
        title: "Action Denied",
        description: "You need to be logged in to submit an answer",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/api/answers", {
        authorId,
        questionId,
        content: data.content,
      });
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } else {
        toast({
          title: "Failure",
          description:
            res.data.error instanceof Error
              ? res.data.error.message
              : "Something went wrong with API",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failure",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong submitting",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleAiSubmit = async () => {
    if (!authorId) {
      toast({
        title: "Action Denied",
        description: "You need to be logged in to generate an answer",
        variant: "destructive",
      });
      return;
    }
    setIsAiLoading(true); // Set AI loading state
    try {
      const res = await axios.post("/api/answers/ai-answer", {
        authorId,
        questionId,
      });
      if (res.data.success) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
      } else {
        toast({
          title: "Failure",
          description:
            res.data.error instanceof Error
              ? res.data.error.message
              : "Something went wrong with API",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failure",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong generating AI answer",
        variant: "destructive",
      });
    }
    setIsAiLoading(false); // Reset AI loading state
  };

  return (
    <div className="space-y-4">
      <Button
        className="primary-gradient text-white flex items-center gap-2"
        onClick={handleAiSubmit}
        disabled={isAiLoading}
      >
        {isAiLoading && <ReloadIcon className="w-4 h-4 animate-spin" />}
        {isAiLoading ? "Generating..." : "Generate AI Answer"}
      </Button>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name={"content"}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel>
                  Write your answer here{" "}
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Editor value={field.value} fieldChange={field.onChange} />
                </FormControl>
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
            {isLoading ? "Submitting..." : "Submit Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
