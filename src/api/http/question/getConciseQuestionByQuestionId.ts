import { AvatarUrlType, TagNameType } from "../../../constants/info";
import request from "../../request";

export interface GetConciseQuestionByQuestionIdDataReq {
  questionId: number;
}

export type GetConciseQuestionByQuestionIdRes = {
  questionID: number;
  title: string;
  userName: string;
  userAvatar: AvatarUrlType;
  createTime: number;
  updateTime: number;
  questionImages: string[];
  content: string;
  tags: TagNameType[];
  likesCount: number;
  hasAdoption: boolean;
};

export async function getConciseQuestionByQuestionId(
  data: GetConciseQuestionByQuestionIdDataReq
): Promise<GetConciseQuestionByQuestionIdRes | null> {
  const res = await request<GetConciseQuestionByQuestionIdRes>({
    url: `/question/getConciseQuestionByQuestionId`,
    method: "post",
    data,
  });

  return res;
}
