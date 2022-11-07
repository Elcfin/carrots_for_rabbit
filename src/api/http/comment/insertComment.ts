import request from "../../request";

export interface InsertCommentDataReq {
  token: string;
  answerId: number;
  content: string;
}

export type InsertCommentDataRes = string;

export async function insertComment(
  data: InsertCommentDataReq
): Promise<InsertCommentDataRes | null> {
  const res = await request<InsertCommentDataRes>({
    url: `comment/insertComment`,
    method: "post",
    data,
  });
  return res;
}
