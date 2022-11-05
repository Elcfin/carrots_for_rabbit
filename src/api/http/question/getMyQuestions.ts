import request from "../../request";

export interface GetMyQuestionsDataReq {
  token: string;
  userName: string;
}

export type UserQuestionItemType = {
  questionTitle: string;
  answerCount: number;
  hasAdoption: boolean;
  latestAnswerTime: number;
};

export type GetMyQuestionsDataRes = {
  questions: UserQuestionItemType[];
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
