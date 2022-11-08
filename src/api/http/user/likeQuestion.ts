import request from "../../request";

export interface likeQuestionDataReq {
  token: string;
  like: boolean;
  questionId: number;
}

type likeQuestionDataRes = string;

export async function likeQuestion(
  data: likeQuestionDataReq
): Promise<likeQuestionDataRes | null> {
  const res = await request<likeQuestionDataRes>({
    url: `/user/likeQuestion`,
    method: "post",
    data,
  });
  return res;
}
