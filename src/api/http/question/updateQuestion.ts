import { TagNameType } from "../../../constants/info";
import request from "../../request";

export interface UpdateQuestionDataReq {
  token: string;
  questionId: number;
  title: string;
  content: string;
  imageURLs: string[];
  tags: TagNameType[];
}

type UpdateQuestionRes = string;

export async function updateQuestion(
  data: UpdateQuestionDataReq
): Promise<UpdateQuestionRes | null> {
  const res = await request<UpdateQuestionRes>({
    url: `/question/updateQuestion`,
    method: "post",
    data,
  });

  return res;
}
