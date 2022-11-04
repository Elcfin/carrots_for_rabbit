import { IconUpload } from "@douyinfe/semi-icons";
import {
  TabPane,
  Tabs,
  Avatar,
  Typography,
  Button,
  Upload,
  Modal,
  Input,
  Select,
  TextArea,
  AvatarGroup,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { uploadFile } from "../../api/http/test";
import QuestionBar from "../../components/QuestionBar";
import { GRADELIST, MAJORLIST } from "../../constants/info";
import AboutAnsBar from "./components/AboutAnsBar";
import AboutHistoryBar from "./components/AboutHistoryBar";
import AboutQuesBar from "./components/AboutQuesBar";
import "./index.scss";

const About = () => {
  const { Text, Paragraph } = Typography;
  const [isModalShow, setIsModalShow] = useState(false);
  const [isImgModalShow, setIsImgModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [desc, setDesc] = useState("");

  return (
    <div className="about">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab="关于我" itemKey="about">
          <div className="about-x">
            <div>
              {/* 防止高度受到 list 部分影响 */}
              <div
                className="about-x-info"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
              >
                <Avatar
                  size="extra-large"
                  style={{
                    width: "96px",
                    height: "96px",
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                  }}
                  alt="User"
                  onClick={() => {
                    setIsImgModalShow(true);
                  }}
                >
                  U
                </Avatar>
                <Text link style={{ fontSize: 16 }}>
                  小豆泥爱喝酒
                </Text>
                <Button
                  size="small"
                  disabled
                  style={{
                    color: "var(--semi-color-text-2)",
                    cursor: "default",
                  }}
                >{`被采纳回答数 ${8}`}</Button>
                <Text>{`190839444@qq.com`}</Text>
                <Text>{`${"大三"} ${"法学"}`}</Text>
                <Paragraph
                  style={{
                    color: "var(--semi-color-text-2)",
                    textAlign: "center",
                  }}
                >
                  山有木兮木有枝，心悦君兮君不知
                </Paragraph>
                <Button
                  theme="borderless"
                  style={{ transitionDuration: ".3s" }}
                  onClick={() => {
                    setIsModalShow(true);
                  }}
                >
                  编辑资料
                </Button>
                <Modal
                  visible={isModalShow}
                  header={null}
                  onOk={() => {
                    setIsModalShow(false);
                  }}
                  onCancel={() => {
                    setIsModalShow(false);
                  }}
                  okText={"保存修改"}
                  cancelText={"取消"}
                  style={{ width: "360px" }}
                  bodyStyle={{
                    paddingTop: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                  maskClosable={false}
                >
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
                  <TextArea
                    maxCount={100}
                    value={desc}
                    onChange={(v) => {
                      setDesc(v);
                    }}
                  />
                </Modal>
                <Modal
                  visible={isImgModalShow}
                  header={null}
                  onOk={() => {
                    setIsImgModalShow(false);
                  }}
                  onCancel={() => {
                    setIsImgModalShow(false);
                  }}
                  okText={"选择头像"}
                  cancelText={"取消"}
                  style={{
                    width: "280px",
                  }}
                  bodyStyle={{
                    paddingTop: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  maskClosable={false}
                >
                  <AvatarGroup size="large">
                    <Avatar
                      src={require("../../assets/avatar1.jpg")}
                      onClick={(e) => {
                        setSelectedAvatar(0);
                      }}
                      style={{
                        borderColor:
                          selectedAvatar === 0
                            ? "var(--semi-color-carrot)"
                            : "white",
                      }}
                    />
                    <Avatar
                      src={require("../../assets/avatar2.jpg")}
                      onClick={(e) => {
                        setSelectedAvatar(1);
                      }}
                      style={{
                        borderColor:
                          selectedAvatar === 1
                            ? "var(--semi-color-carrot)"
                            : "white",
                      }}
                    />
                    <Avatar
                      src={require("../../assets/avatar3.jpg")}
                      onClick={(e) => {
                        setSelectedAvatar(2);
                      }}
                      style={{
                        borderColor:
                          selectedAvatar === 2
                            ? "var(--semi-color-carrot)"
                            : "white",
                      }}
                    />
                  </AvatarGroup>
                </Modal>
              </div>
            </div>
            <div className="about-x-list">
              <Tabs type="button">
                <TabPane tab="我的提问" itemKey="ques">
                  <div className="about-x-list-wrapper">
                    <AboutQuesBar
                      title={"夏天结束了"}
                      timeStamp={1666357592926}
                      isSolved={true}
                      ansCount={8}
                    />
                    <AboutQuesBar
                      title={"夏天结束了"}
                      timeStamp={1666357592926}
                      isSolved={true}
                      ansCount={6}
                    />
                  </div>
                </TabPane>
                <TabPane tab="我的回答" itemKey="ans">
                  <div className="about-x-list-wrapper">
                    <AboutAnsBar
                      title={"夏天结束了"}
                      timeStamp={1666357592926}
                      isSolved={true}
                      isSolvedByMe={true}
                    />
                    <AboutAnsBar
                      title={"夏天结束了"}
                      timeStamp={1666357592926}
                      isSolved={true}
                      isSolvedByMe={true}
                    />
                  </div>
                </TabPane>
                <TabPane tab="浏览记录" itemKey="history">
                  <div className="about-x-list-wrapper">
                    <AboutHistoryBar
                      title={"夏天结束了"}
                      timeStamp={1666357592926}
                      isSolved={true}
                      ansCount={6}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default About;
