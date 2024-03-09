import * as z from "zod";

export const diarySchema = z.object({
  diary: z.string().min(1, { message: "내용을 입력해주세요." })
});