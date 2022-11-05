import request from "../../request";

export interface CheckUserNameExistsDataReq {
  token?: string;
  userName: string;
}

type CheckUserNameExistsDataRes = {
  exist: true;
};

export async function checkUserNameExists(
  data: CheckUserNameExistsDataReq
): Promise<CheckUserNameExistsDataRes | null> {
  const res = await request<CheckUserNameExistsDataRes>({
    url: `user/checkUserNameExists`,
    method: "post",
    data,
  });
  return res;
}
