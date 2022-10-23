import { Button } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui";
import { useState } from "react";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginBtnClick = () => {
    console.log("Login", username, password);
    setUsername("");
    setPassword("");
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
