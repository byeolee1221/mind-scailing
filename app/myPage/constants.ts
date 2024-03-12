import * as z from "zod";

export const introduceSchema = z.object({
  introduce: z.string().min(1, { message: "자기소개를 입력해주세요." })
});