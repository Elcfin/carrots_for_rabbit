import request from "../../request";

export interface UnlikeQuestionDataReq {
  token: string;
  unlike: boolean;
  questionId: number;
}

type UnlikeQuestionDataRes = string;

export async function unlikeQuestion(
  data: UnlikeQuestionDataReq
): Promise<UnlikeQuestionDataRes | null> {
  const res = await request<UnlikeQuestionDataRes>({
    url: `/user/unlikeQuestion`,
    method: "post",
    data,
  });
  return res;
}
