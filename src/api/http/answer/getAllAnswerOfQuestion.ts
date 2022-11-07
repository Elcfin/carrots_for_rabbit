import request from "../../request";

export interface GetAllAnswerOfQuestionDataReq {
  questionId: number;
}

export interface CommentItemType {
  commentId: number;
  userName: string;
  content: string;
  createTime: number;
}

export interface AnswerItemType {
  answerId: number;
  userName: string;
  userImage: string;
  createTime: number;
  answerImages: string[];
  content: string;
  likesCount: number;
  isAdopted: boolean;
  comments: {
    comments: CommentItemType[];
  };
}

export type GetAllAnswerOfQuestionDataRes = {
  answers: AnswerItemType[];
};

export async function getAllAnswerOfQuestion(
  data: GetAllAnswerOfQuestionDataReq
): Promise<GetAllAnswerOfQuestionDataRes | null> {
  const res = await request<GetAllAnswerOfQuestionDataRes>({
    url: `answer/getAllAnswerOfQuestion`,
    method: "post",
    data,
  });
  return res;
}
