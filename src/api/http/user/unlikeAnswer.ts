import request from "../../request";

export interface UnlikeAnswerDataReq {
  token: string;
  unlike: boolean;
  answerId: number;
}

type UnlikeAnswerDataRes = string;

export async function unlikeAnswer(
  data: UnlikeAnswerDataReq
): Promise<UnlikeAnswerDataRes | null> {
  const res = await request<UnlikeAnswerDataRes>({
    url: `/user/unlikeAnswer`,
    method: "post",
    data,
  });
  return res;
}
