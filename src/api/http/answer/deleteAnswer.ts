import request from "../../request";

export interface DeleteAnswerDataReq {
  token: string;
  answerId: number;
}

type DeleteAnswerRes = string;

export async function deleteAnswer(
  data: DeleteAnswerDataReq
): Promise<DeleteAnswerRes | null> {
  const res = await request<DeleteAnswerRes>({
    url: `/answer/deleteAnswer`,
    method: "post",
    data,
  });

  return res;
}
