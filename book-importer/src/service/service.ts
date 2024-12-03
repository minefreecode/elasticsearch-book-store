import { api } from "./api";
import { Book } from "@/types/book";

export async function uploadBooks(book: Book[]) {
  try {
    const response = await api.post("book/upload", book);
    return response.data;
  } catch (error) {
    console.error("Error uploading books", error);
    throw error;
  }
}
