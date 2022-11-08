import request from "../../request";

export interface GetMyAnswersDataReq {
  token: string;
  userName: string;
  pageSize: number;
  num: number;
}

export type UserAnswerItemType = {
  questionTitle: string;
  answerCount: number;
  isMineAdoption: boolean;
  hasAdoption: boolean;
  answerTime: number;
  questionId: number;
};

export type GetMyAnswersDataRes = {
  myAnswers: UserAnswerItemType[];
  pageSum: number;
};

export async function getMyAnswers(
  data: GetMyAnswersDataReq
): Promise<GetMyAnswersDataRes | null> {
  const res = await request<GetMyAnswersDataRes>({
    url: `answer/getMyAnswers`,
    method: "post",
    data,
  });
  return res;
}
