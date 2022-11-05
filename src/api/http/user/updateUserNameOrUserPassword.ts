import { AvatarUrlType, GradeType, MajorType } from "../../../constants/info";
import request from "../../request";

export interface UpdateUserNameOrUserPasswordDataReq {
  token: string;
  userName: string;
  userPassword: string;
}

export type UpdateUserNameOrUserPasswordDataRes = {
  userName: string;
  userImageUrl: AvatarUrlType;
  adoptedAnswerCount: number;
  userEmail: string;
  userGrade: GradeType;
  userMajor: MajorType;
  userDesc: string;
};

export async function updateUserNameOrUserPassword(
  data: UpdateUserNameOrUserPasswordDataReq
): Promise<UpdateUserNameOrUserPasswordDataRes | null> {
  const res = await request<UpdateUserNameOrUserPasswordDataRes>({
    url: `user/updateUserNameOrUserPassword`,
    method: "post",
    data,
  });
  return res;
}
