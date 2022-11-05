import request from "../../request";

export interface LoginDataReq {
  userName: string;
  userPassword: string;
}

interface LoginDataRes {
  token: string;
  authority: 0 | 1;
}

export async function login(data: LoginDataReq): Promise<LoginDataRes | null> {
  const res = await request<LoginDataRes>({
    url: `/login`,
    method: "post",
    data,
  });
  return res;
}
