import request from "../../request";

export interface DeleteCommentDataReq {
  token: string;
  answerCommentId: number;
}

type DeleteCommentRes = string;

export async function deleteComment(
  data: DeleteCommentDataReq
): Promise<DeleteCommentRes | null> {
  const res = await request<DeleteCommentRes>({
    url: `/comment/deleteComment`,
    method: "post",
    data,
  });

  return res;
}
