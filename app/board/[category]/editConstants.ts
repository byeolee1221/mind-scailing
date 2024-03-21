import * as z from "zod";

export const editPostSchema = z.object({
  post: z.string().min(1, { message: "내용을 입력해주세요." })
});