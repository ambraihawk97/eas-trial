import { twMerge } from "tailwind-merge";
import _clsx from "clsx";
import type { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(_clsx(...inputs));
};
