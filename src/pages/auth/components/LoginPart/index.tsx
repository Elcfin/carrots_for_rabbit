import { Button } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getMyUserInfo } from "../../../../api/http/user/getMyUserInfo";
import { login } from "../../../../api/http/user/login";
import {
  AUTH_KEY,
  EXPIRE_KEY,
  TOKEN_KEY,
  USERNAME_KEY,
} from "../../../../constants/token";
import { showToast } from "../../../../utils/showToast";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLoginBtnClick = async () => {
    if (username === "") {
      showToast("用户名不能为空", "info");
      return;
    }
    if (password === "") {
      showToast("密码不能为空", "info");
      return;
    }
    const res = await login({ userName: username, userPassword: password });
    if (!res) {
      return;
    }
    const data = { token: res.token };
    const resData = await getMyUserInfo(data);
    if (resData) {
      showToast("登录成功", "info");
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(AUTH_KEY, res.authority.toString());
      localStorage.setItem(USERNAME_KEY, resData.userName);
      localStorage.setItem(
        EXPIRE_KEY,
        (new Date().getTime() + 86400000 * 7).toString()
      );
      navigate("/home");
      setUsername("");
      setPassword("");
    }
  };

  return { username, setUsername, password, setPassword, handleLoginBtnClick };
};

const LoginPart = () => {
  const { username, setUsername, password, setPassword, handleLoginBtnClick } =
    useLogin();

  return (
    <div className="auth-x-login">
      <Input
        placeholder="用户名"
        value={username}
        onChange={(v) => {
          setUsername(v);
        }}
      />
      <Input
        placeholder="密码"
        mode="password"
        value={password}
        onChange={(v) => {
          setPassword(v);
        }}
      />
      <Button
        style={{ width: 120, margin: "auto" }}
        onClick={() => {
          handleLoginBtnClick();
        }}
      >
        登录
      </Button>
    </div>
  );
};

export default LoginPart;
