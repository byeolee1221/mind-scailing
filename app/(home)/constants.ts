import * as z from "zod";

export const formSchema = z.object({
  conversation: z.string().min(1, {message: "대화하시려면 질문을 입력해주세요."}),
});
