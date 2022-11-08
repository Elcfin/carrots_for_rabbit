import request from "../../request";

export interface likeAnswerDataReq {
  token: string;
  like: boolean;
  answerId: number;
}

type likeAnswerDataRes = string;

export async function likeAnswer(
  data: likeAnswerDataReq
): Promise<likeAnswerDataRes | null> {
  const res = await request<likeAnswerDataRes>({
    url: `/user/likeAnswer`,
    method: "post",
    data,
  });
  return res;
}
