import request from "../request";

interface getLatestQuestionsDataReq {
  pageSize: number;
  num: number;
}

interface getLatestQuestionsRes {
  answerCount: number;
  questionTitle: string;
  tags: string[];
  hasAdopt: boolean;
  latestAnswerTime: number;
  questionContent: string;
}

export async function getLatestQuestions(
  data: getLatestQuestionsDataReq
): Promise<getLatestQuestionsRes | null> {
  const res = await request<getLatestQuestionsRes>({
    url: `/getLastQuestions`,
    method: "post",
    data,
  });

  return res;
}
