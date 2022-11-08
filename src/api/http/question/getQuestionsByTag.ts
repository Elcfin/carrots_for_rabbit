import { TagNameType } from "../../../constants/info";
import request from "../../request";

export interface GetQuestionsByTagDataReq {
  tagName: string;
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

type GetQuestionsByTagRes = {
  pageSum: number;
  questions: QuestionListItemType[];
};

export async function getQuestionsByTag(
  data: GetQuestionsByTagDataReq
): Promise<GetQuestionsByTagRes | null> {
  const res = await request<GetQuestionsByTagRes>({
    url: `/getQuestionsByTag`,
    method: "post",
    data,
  });

  return res;
}
