import request from "../../request";

export interface InsertAnswerDataReq {
  token: string;
  questionId: number;
  content: string;
}

export type InsertAnswerDataRes = string;

export async function insertAnswer(
  data: InsertAnswerDataReq
): Promise<InsertAnswerDataRes | null> {
  const res = await request<InsertAnswerDataRes>({
    url: `answer/insertAnswer`,
    method: "post",
    data,
  });
  return res;
}
