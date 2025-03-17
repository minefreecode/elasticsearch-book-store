import { api } from "./api";
import { Book } from "@/types/book"; //Импортируем тип данных

/**
 * Загрузить книги
 * @param book
 */
export async function uploadBooks(book: Book[]) {
  try {
    const response = await api.post("book/upload", book); //Делаем пост на внешний ресурс
    return response.data;//Получаем данные
  } catch (error) {
    console.error("Error uploading books", error);
    throw error;
  }
}
