import { tagMap } from "@/constants/tagMap";
import { tagMappings } from "@/constants/tagMapping";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClass = (tag: string) => {
  const normalizedTechName = tag.replace(/[ .]/g, "").toLowerCase();

  return tagMap[normalizedTechName]
    ? `${tagMap[normalizedTechName]} colored`
    : "devicon-devicon-plain"; // Example: devicon-javascript-plain
};

export const normalizeTag = (tag: string): string => {
  const normalizedTag = tag.trim().toLowerCase().replace(/\./g, ""); // Remove dots
  return tagMappings[normalizedTag] || normalizedTag;
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export const extractErrorMessages = (
  error: Record<string, string[]>
): string => {
  const messageArray: string[][] = Object.keys(error).map(
    (message) => error[message]
  );
  const message = messageArray.join(",");
  return message;
};
