import { AvatarUrlType, GradeType, MajorType } from "../../../constants/info";
import request from "../../request";

export interface UpdateMyUserInfoDataReq {
  token: string;
  userName: string;
  userImageUrl: AvatarUrlType;
  adoptedAnswerCount: number;
  userEmail: string;
  userGrade: GradeType;
  userMajor: MajorType;
  userDesc: string;
}

export type UpdateMyUserInfoDataRes = {
  userName: string;
  userImageUrl: AvatarUrlType;
  adoptedAnswerCount: number;
  userEmail: string;
  userGrade: GradeType;
  userMajor: MajorType;
  userDesc: string;
};

export async function updateMyUserInfo(
  data: UpdateMyUserInfoDataReq
): Promise<UpdateMyUserInfoDataRes | null> {
  const res = await request<UpdateMyUserInfoDataRes>({
    url: `user/updateMyUserInfo`,
    method: "post",
    data,
  });
  return res;
}
