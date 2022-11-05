import request from "../../request";

interface getLatestQuestionsDataReq {
  pageSize: number;
  num: number;
}

export type QuestionListItemType = {
  questionID: number;
  userName: string;
  answerCount: number;
  questionTitle: string;
  tags: string[];
  hasAdopt: boolean;
  latestAnswerTime: number;
  questionTime: number;
  questionContent: string;
};

type getLatestQuestionsRes = {
  questions: QuestionListItemType[];
};

export async function getLatestQuestions(
  data: getLatestQuestionsDataReq
): Promise<getLatestQuestionsRes | null> {
  const res = await request<getLatestQuestionsRes>({
    url: `/getLatestQuestions`,
    method: "post",
    data,
  });

  return res;
}
