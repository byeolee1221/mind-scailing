import * as z from "zod";

export const noticeSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }),
  notice: z.string().min(1, { message: "본문을 입력해주세요." }),
});