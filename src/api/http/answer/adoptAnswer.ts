import request from "../../request";

export interface AdoptAnswerDataReq {
  token: string;
  answerId: number;
}

type AdoptAnswerRes = string;

export async function adoptAnswer(
  data: AdoptAnswerDataReq
): Promise<AdoptAnswerRes | null> {
  const res = await request<AdoptAnswerRes>({
    url: `/answer/adoptAnswer`,
    method: "post",
    data,
  });

  return res;
}
