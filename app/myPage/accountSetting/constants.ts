import * as z from "zod";

export const accountSchema = z.object({
  accountName: z
    .string()
    .min(1, { message: "변경할 이름을 입력해주세요." })
    .max(8, { message: "8자 이상 입력할 수 없습니다." }),
});
