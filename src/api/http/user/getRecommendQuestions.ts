import {
  AvatarUrlType,
  GradeType,
  MajorType,
  TagNameType,
} from "../../../constants/info";
import request from "../../request";

export interface GetRecommendQuestionsDataReq {
  token: string;
  prefer: boolean;
}

export type QuestionItemType = {
  questionID: number;
  userName: string;
  answerCount: number;
  questionTitle: string;
  tags: TagNameType[];
  hasAdopt: boolean;
  latestAnswerTime: number;
  questionTime: number;
  questionContent: string;
};

export interface GetRecommendQuestionsDataRes {
  questions: QuestionItemType[];
}

export async function getRecommendQuestions(
  data: GetRecommendQuestionsDataReq
): Promise<GetRecommendQuestionsDataRes | null> {
  const res = await request<GetRecommendQuestionsDataRes>({
    url: `user/getRecommendQuestions`,
    method: "post",
    data,
  });
  return res;
}
