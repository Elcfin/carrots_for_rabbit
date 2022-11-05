import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { AUTH_KEY, TOKEN_KEY } from "../constants/token";
import { showToast } from "../utils/showToast";
import { SERVER_BASE_URL } from "./config";

/**
 * 失败会返回200以外的http状态码
 */
type BaseHttpInfo<Data> = {
  success: boolean;
  error: string;
  /**
   * 错误提示信息, 出现错误时直接使用即可
   */
  msg: string;
  data: Data;
};

const DEFAULT_ERR_MSG = "出错了！";

type Extra = {
  /** 不在出错时自动弹 toast */
  notShowHint?: boolean;
  /** 是否绕开节流限制 */
  bypassThrottle?: boolean;
  /** 是否在401时自动重定向到登录页 */
  notAutoRedirect?: boolean;
};

const requestMap = new Set<string>();
function config2Str(config: AxiosRequestConfig) {
  return JSON.stringify({ b: config.data, u: config.url, p: config.params });
}

export default async function _request<Data>(
  config: AxiosRequestConfig,
  extra?: Extra
): Promise<Data | null> {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 68000,
  });
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers = {
      ...(config.headers || {}),
    };
    config.headers["Authorization"] = "Bearer " + token;
  }

  let onFinally: () => undefined | void = () => void 0;

  if (config.method?.toLowerCase() !== "get" && !extra?.bypassThrottle) {
    const key = config2Str(config);
    if (requestMap.has(key)) return null;

    requestMap.add(config2Str(config));
    onFinally = showToast("请求中...", "info", { duration: 99999 });
  }

  try {
    /** 执行请求 */
    const res = await instance.request<BaseHttpInfo<Data>>(config);
    console.log("res", res);
    if (res.status === 200 && res.data && res.data.success) {
      const data = res.data.data;
      return data;
    } else if (!res.data) {
      /**
       * 请求没有消息体(可能是请求都没达到后端)
       */
      throw DEFAULT_ERR_MSG;
    } else {
      /**
       * 其他情况(后端正常的报错)
       */
      throw res.data.error || DEFAULT_ERR_MSG;
    }
  } catch (err) {
    console.log("Error in request: ", { config, err });

    let errMsg = DEFAULT_ERR_MSG;
    if (typeof err === "string") {
      /** 自己 throw 的 error */
      errMsg = err;
    } else if ((err as AxiosError).isAxiosError) {
      /** http 状态码不为 200 */
      const axiosErr = err as AxiosError<BaseHttpInfo<Data>>;
      if (axiosErr.response) {
        errMsg = axiosErr.response.data.error || DEFAULT_ERR_MSG;

        if (axiosErr.response.status === 401 && !extra?.notAutoRedirect) {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(AUTH_KEY);
          window.location.replace("/auth");
        }
      }
    } else if (err instanceof Error) {
      /** 其他错误 */
      errMsg = err.message;
    }

    /** 可能有个别请求不需要弹出提示 */
    if (extra && extra.notShowHint) {
      /* PASS */
    } else {
      showToast(errMsg, "error");
    }

    /** 错误一律返回 null */
    return null;
  } finally {
    requestMap.delete(config2Str(config));
    onFinally();
  }
}
