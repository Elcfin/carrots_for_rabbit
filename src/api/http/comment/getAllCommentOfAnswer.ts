import request from "../../request";

export interface GetAllCommentOfAnswerDataReq {
  answerId: number;
}

export interface CommentItemType {
  commentId: number;
  userName: string;
  content: string;
  createTime: number;
}

export type GetAllCommentOfAnswerDataRes = {
  comments: CommentItemType[];
};

export async function getAllCommentOfAnswer(
  data: GetAllCommentOfAnswerDataReq
): Promise<GetAllCommentOfAnswerDataRes | null> {
  const res = await request<GetAllCommentOfAnswerDataRes>({
    url: `comment/getAllCommentOfAnswer`,
    method: "post",
    data,
  });
  return res;
}
