import { useMutation } from "@tanstack/react-query";
import { uploadBooks } from "./service";

export function useUploadBooks() {
  return useMutation({
    mutationFn: uploadBooks,
  });
}
