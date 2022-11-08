import request from "../../request";

export interface DeleteQuestionDataReq {
  token: string;
  questionId: number;
}

type DeleteQuestionRes = string;

export async function deleteQuestion(
  data: DeleteQuestionDataReq
): Promise<DeleteQuestionRes | null> {
  const res = await request<DeleteQuestionRes>({
    url: `/question/deleteQuestion`,
    method: "post",
    data,
  });

  return res;
}
