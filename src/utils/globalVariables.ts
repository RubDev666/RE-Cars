import { MainKeyQueryParams } from "@/types";

export const mainKeyQueryParams: MainKeyQueryParams[] = ['brand', 'year', 'doors', 'transmission', 'color'];

export const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API;