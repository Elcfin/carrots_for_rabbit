import { TagNameType } from "../../../constants/info";
import request from "../../request";

export interface InsertNewQuestionDataReq {
  token: string;
  title: string;
  content: string;
  imageURLs: string[];
  tags: TagNameType[];
}

type InsertNewQuestionRes = string;

export async function insertNewQuestion(
  data: InsertNewQuestionDataReq
): Promise<InsertNewQuestionRes | null> {
  const res = await request<InsertNewQuestionRes>({
    url: `/question/insertNewQuestion`,
    method: "post",
    data,
  });

  return res;
}
