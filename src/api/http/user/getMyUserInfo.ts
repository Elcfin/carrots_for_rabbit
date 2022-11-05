import { AvatarUrlType, GradeType, MajorType } from "../../../constants/info";
import request from "../../request";

export interface GetMyUserInfoDataReq {
  token: string;
}

export type GetMyUserInfoDataRes = {
  userName: string;
  userImageUrl: AvatarUrlType;
  adoptedAnswerCount: number;
  userEmail: string;
  userGrade: GradeType;
  userMajor: MajorType;
  userDesc: string;
};

export async function getMyUserInfo(
  data: GetMyUserInfoDataReq
): Promise<GetMyUserInfoDataRes | null> {
  const res = await request<GetMyUserInfoDataRes>({
    url: `user/getMyUserInfo`,
    method: "post",
    data,
  });
  return res;
}
