import request from "../../request";

export interface GetMyViewsDataReq {
  token: string;
}

export type UserViewItemType = {
  question: {
    questionID: number;
    userName: string;
    answerCount: number;
    questionTitle: string;
    tags: string;
    hasAdopt: boolean;
    latestAnswerTime: number;
    questionTime: number;
    questionContent: string;
  };
  viewTime: number;
};

export type GetMyViewsDataRes = {
  myViews: UserViewItemType[];
};

export async function getMyViews(
  data: GetMyViewsDataReq
): Promise<GetMyViewsDataRes | null> {
  const res = await request<GetMyViewsDataRes>({
    url: `user/getMyViews`,
    method: "post",
    data,
  });
  return res;
}
