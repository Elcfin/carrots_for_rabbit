import request from "../../request";

export interface GetMyAnswersDataReq {
  token: string;
  userName: string;
}

export type UserAnswerItemType = {
  questionTitle: string;
  answerCount: number;
  isMineAdoption: boolean;
  hasAdoption: boolean;
  answerTime: number;
};

export type GetMyAnswersDataRes = {
  answers: UserAnswerItemType[];
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
