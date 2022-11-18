import { Button } from "@douyinfe/semi-ui";
import { Input, Select, Switch, Typography } from "@douyinfe/semi-ui";
import {
  GRADELIST,
  GradeType,
  MAJORLIST,
  MajorType,
  TAGNAMELIST,
  TagNameType,
} from "../../../../constants/info";
import { useState } from "react";
import { register, RegisterDataReq } from "../../../../api/http/user/register";
import { checkUserNameExists } from "../../../../api/http/user/checkUserNameExists";
import { showToast } from "../../../../utils/showToast";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAsker, setIsAsker] = useState(false);

  const [selectedTags, setSelectedTags] = useState<TagNameType[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<GradeType>(GRADELIST[0]);
  const [selectedMajor, setSelectedMajor] = useState<MajorType>(MAJORLIST[0]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    isAsker,
    setIsAsker,
    selectedTags,
    setSelectedTags,
    selectedGrade,
    setSelectedGrade,
    selectedMajor,
    setSelectedMajor,
    conPassword,
    setConPassword,
  };
};

interface RegisterPartProps {
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterPart = (props: RegisterPartProps) => {
  const { Text } = Typography;
  const { setActiveKey } = props;
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    isAsker,
    setIsAsker,
    selectedTags,
    setSelectedTags,
    selectedGrade,
    setSelectedGrade,
    selectedMajor,
    setSelectedMajor,
    conPassword,
    setConPassword,
  } = useRegister();

  const handleRegisterBtnClick = async () => {
    if (!username) {
      showToast("请输入用户名", "info");
      return;
    }
    /* 检测用户名是否存在 */
    const resData = await checkUserNameExists({
      userName: username,
    });
    if (!resData) return;
    if (resData.exist) {
      showToast("用户名已存在", "info");
      return;
    }
    if (username.length > 6) {
      showToast("用户名至多六个字", "info");
      return;
    }
    if (!password) {
      showToast("请输入密码", "info");
      return;
    }
    if (!conPassword) {
      showToast("请确认密码", "info");
      return;
    }
    if (password !== conPassword) {
      showToast("两次密码不一致", "info");
      return;
    }
    if (!email) {
      showToast("请输入邮箱", "info");
      return;
    }

    const data: RegisterDataReq = {
      userName: username,
      userPassword: password,
      tags: selectedTags,
      prefer: isAsker,
      grade: selectedGrade,
      major: selectedMajor,
      email,
    };

    const res = await register(data);
    if (res) {
      showToast("注册成功", "info");
      setActiveKey("login");
      /* 初始化表单数据 */
      setUsername("");
      setPassword("");
      setConPassword("");
      setEmail("");
      setIsAsker(false);
      setSelectedTags([]);
      setSelectedGrade(GRADELIST[0]);
      setSelectedMajor(MAJORLIST[0]);
    }
  };

  return (
    <div className="auth-x-register">
      <Input
        placeholder="请输入用户名"
        value={username}
        onChange={async (v) => {
          setUsername(v);
        }}
        onBlur={async (e) => {
          if (!e.target.value) return;
          const resData = await checkUserNameExists({
            userName: e.target.value,
          });
          if (!resData) return;
          if (resData.exist) {
            showToast("用户名已存在", "info");
            return;
          }
        }}
      />
      <Input
        placeholder="请输入密码"
        mode="password"
        value={password}
        onChange={(v) => {
          setPassword(v);
        }}
      />
      <Input
        placeholder="请确认密码"
        mode="password"
        value={conPassword}
        onChange={(v) => {
          setConPassword(v);
        }}
      />
      <Input
        placeholder="请输入邮箱"
        value={email}
        onChange={(v) => {
          setEmail(v);
        }}
      />
      <Select
        value={selectedGrade}
        onChange={(v) => {
          setSelectedGrade(v as GradeType);
        }}
      >
        {GRADELIST.map((grade) => (
          <Select.Option key={grade} value={grade}>
            {grade}
          </Select.Option>
        ))}
      </Select>
      <Select
        value={selectedMajor}
        onChange={(v) => {
          setSelectedMajor(v as MajorType);
        }}
      >
        {MAJORLIST.map((major) => (
          <Select.Option key={major} value={major}>
            {major}
          </Select.Option>
        ))}
      </Select>
      <Text style={{ margin: "auto" }}>请选择关注的标签（可多选）</Text>
      <Select
        multiple
        value={selectedTags}
        onChange={(v) => {
          setSelectedTags(v as TagNameType[]);
        }}
      >
        {TAGNAMELIST.map((tag) => (
          <Select.Option key={tag} value={tag}>
            {tag}
          </Select.Option>
        ))}
      </Select>
      <div className="auth-x-register-switch">
        <Text style={{ flex: 1, textAlign: "center" }}>
          是否更倾向于在本网站提出问题
        </Text>
        <Switch
          checked={isAsker}
          onChange={(v, e) => {
            setIsAsker(v);
          }}
        />
      </div>
      <Button
        style={{ width: 120, margin: "auto" }}
        onClick={() => {
          handleRegisterBtnClick();
        }}
      >
        注册
      </Button>
    </div>
  );
};

export default RegisterPart;
