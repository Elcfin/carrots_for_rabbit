import request from "../../request";
import { TagNameType, GradeType, MajorType } from "../../../constants/info";

export interface RegisterDataReq {
  userName: string;
  userPassword: string;
  tags: TagNameType[];
  prefer: boolean;
  grade: GradeType;
  major: MajorType;
  email: string;
}

type RegisterDataRes = string;

export async function register(
  data: RegisterDataReq
): Promise<RegisterDataRes | null> {
  const res = await request<RegisterDataRes>({
    url: `/register`,
    method: "post",
    data,
  });
  return res;
}
