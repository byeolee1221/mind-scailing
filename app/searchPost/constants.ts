import * as z from "zod";

export const searchSchema = z.object({
  search: z.string().min(1, {message: "검색할 내용을 입력해주세요."}),
});
