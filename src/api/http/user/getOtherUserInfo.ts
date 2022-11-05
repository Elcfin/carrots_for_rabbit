import { AvatarUrlType, GradeType, MajorType } from "../../../constants/info";
import request from "../../request";

export interface GetOtherUserInfoDataReq {
  token: string;
  userName: string;
}

export type GetOtherUserInfoDataRes = {
  userName: string;
  userImageUrl: AvatarUrlType;
  adoptedAnswerCount: number;
  userEmail: string;
  userGrade: GradeType;
  userMajor: MajorType;
  userDesc: string;
};

export async function getOtherUserInfo(
  data: GetOtherUserInfoDataReq
): Promise<GetOtherUserInfoDataRes | null> {
  const res = await request<GetOtherUserInfoDataRes>({
    url: `user/getOtherUserInfo`,
    method: "post",
    data,
  });
  return res;
}
