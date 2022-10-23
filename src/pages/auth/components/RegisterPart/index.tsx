import { Button } from "@douyinfe/semi-ui";
import { Input, Select, Switch, Typography } from "@douyinfe/semi-ui";
import { GRADELIST, MAJORLIST } from "../../../../constants/info";
import { useEffect, useState } from "react";

const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAsker, setIsAsker] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  useEffect(() => {
    setTags(() => ["汇编语言", "机器学习"]);
  }, []);

  const handleRegisterBtnClick = () => {
    console.log(
      "Register",
      username,
      password,
      email,
      selectedTags,
      isAsker,
      selectedGrade,
      selectedMajor
    );
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    tags,
    isAsker,
    setIsAsker,
    selectedTags,
    setSelectedTags,
    selectedGrade,
    setSelectedGrade,
    selectedMajor,
    setSelectedMajor,
    handleRegisterBtnClick,
  };
};

const RegisterPart = () => {
  const { Text } = Typography;
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    tags,
    isAsker,
    setIsAsker,
    setSelectedTags,
    setSelectedGrade,
    setSelectedMajor,
    handleRegisterBtnClick,
  } = useRegister();

  return (
    <div className="auth-x-register">
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
      <Input
        placeholder="邮箱"
        value={email}
        onChange={(v) => {
          setEmail(v);
        }}
      />
      <Select
        defaultValue={GRADELIST[0]}
        onChange={(v) => {
          setSelectedGrade(v as string);
        }}
      >
        {GRADELIST.map((grade) => (
          <Select.Option key={grade} value={grade}>
            {grade}
          </Select.Option>
        ))}
      </Select>
      <Select
        defaultValue={MAJORLIST[0]}
        onChange={(v) => {
          setSelectedMajor(v as string);
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
        onChange={(v) => {
          setSelectedTags(v as string[]);
        }}
      >
        {tags.map((tag) => (
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
