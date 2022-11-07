import request from "../../request";

interface GetSearchedQuestionsDataReq {
  searchString: string;
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

type GetSearchedQuestionsRes = {
  questions: QuestionListItemType[];
};

export async function getSearchedQuestions(
  data: GetSearchedQuestionsDataReq
): Promise<GetSearchedQuestionsRes | null> {
  const res = await request<GetSearchedQuestionsRes>({
    url: `/getSearchedQuestions`,
    method: "post",
    data,
  });

  return res;
}
