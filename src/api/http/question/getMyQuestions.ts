import request from "../../request";

export interface GetMyQuestionsDataReq {
  token: string;
  userName: string;
  pageSize: number;
  num: number;
}

export type UserQuestionItemType = {
  questionTitle: string;
  answerCount: number;
  hasAdoption: boolean;
  createTime: number;
  questionId: number;
};

export type GetMyQuestionsDataRes = {
  questions: UserQuestionItemType[];
  pageSum: number;
};

export async function getMyQuestions(
  data: GetMyQuestionsDataReq
): Promise<GetMyQuestionsDataRes | null> {
  const res = await request<GetMyQuestionsDataRes>({
    url: `question/getMyQuestions`,
    method: "post",
    data,
  });
  return res;
}
