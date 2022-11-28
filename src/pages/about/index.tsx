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
  Skeleton,
  Pagination,
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import QuestionBar from "../../components/QuestionBar";
import {
  GRADELIST,
  MAJORLIST,
  AVATARURLLIST,
  AvatarUrlType,
  GradeType,
  MajorType,
} from "../../constants/info";
import AboutAnsBar from "./components/AboutAnsBar";
import AboutHistoryBar from "./components/AboutHistoryBar";
import AboutQuesBar from "./components/AboutQuesBar";
import "./index.scss";
import {
  GetMyUserInfoDataRes,
  getMyUserInfo,
} from "../../api/http/user/getMyUserInfo";
import { getIsLogin, getSelf, removeSelf } from "../../utils/getSelf";
import { showToast } from "../../utils/showToast";
import {
  updateMyUserInfo,
  UpdateMyUserInfoDataReq,
} from "../../api/http/user/updateMyUserInfo";
import {
  updateUserNameOrUserPassword,
  UpdateUserNameOrUserPasswordDataReq,
} from "../../api/http/user/updateUserNameOrUserPassword";
import { getOtherUserInfo } from "../../api/http/user/getOtherUserInfo";
import {
  getMyQuestions,
  UserQuestionItemType,
} from "../../api/http/question/getMyQuestions";
import {
  getMyAnswers,
  UserAnswerItemType,
} from "../../api/http/answer/getMyAnswers";
import { getMyViews, UserViewItemType } from "../../api/http/user/getMyViews";

const About = () => {
  const { Text, Paragraph } = Typography;
  const [isModalShow, setIsModalShow] = useState(false);
  const [isImgModalShow, setIsImgModalShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<GradeType>(GRADELIST[0]);
  const [selectedMajor, setSelectedMajor] = useState<MajorType>(MAJORLIST[0]);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarUrlType>(
    AVATARURLLIST[0]
  );
  const [desc, setDesc] = useState("");
  const [userInfo, setUserInfo] = useState<GetMyUserInfoDataRes>();
  const [userQuesList, setUserQuesList] = useState<UserQuestionItemType[]>([]);
  const [userAnsList, setUserAnsList] = useState<UserAnswerItemType[]>([]);
  const [userViewList, setUserViewList] = useState<UserViewItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalTabKey, setModalTabKey] = useState<"base" | "username-psw">(
    "base"
  );
  const [isMySelf, setIsMySelf] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [quesCurPage, setQuesCurPage] = useState(1);
  const [ansCurPage, setAnsCurPage] = useState(1);
  const [viewCurPage, setViewCurPage] = useState(1);

  const pageSize = 5;

  const [quesTotalPage, setQuesTotalPage] = useState(0);
  const [ansTotalPage, setAnsTotalPage] = useState(0);
  const [viewTotalPage, setViewTotalPage] = useState(0);

  // 访问的界面的用户名称
  const [showUserName, setShowUserName] = useState("");

  const MyPagination = (props: {
    totalPage: number;
    curPage: number;
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
  }) => {
    return (
      <Pagination
        total={props.totalPage * pageSize}
        style={{ margin: "auto", marginBottom: 12 }}
        size="small"
        pageSize={pageSize}
        currentPage={props.curPage}
        onPageChange={(v) => {
          props.setCurPage(v);
        }}
      />
    );
  };
  useEffect(() => {
    /* console.log(userAnsList); */
  }, [userAnsList]);

  useEffect(() => {
    if (params.username) {
      setShowUserName(params.username);
    }
  }, [params]);

  useEffect(() => {
    // 获取用户个人信息
    const isLogin = getIsLogin();
    const { token, username } = getSelf();

    if (!isLogin || !token || !username) {
      // 为了防止下面使用 token 时报错
      // 用 (!isLogin) 其实就可以
      showToast("需要先登录才可以查看用户信息", "info");
      removeSelf();
      return;
    }

    if (params.username && params.username !== username) {
      const newData = { token, userName: params.username };
      // 浏览器实际会发送两次请求，所以第一次必然返回 null，用 flag 标记一下便于错误处理
      let flag = 0;

      getOtherUserInfo(newData).then((otherResData) => {
        if (otherResData) {
          setUserInfo(otherResData);
          setLoading(false);
        } else {
          if (flag) {
            showToast("该用户不存在", "info");
            navigate("/about");
          }
          flag++;
        }
      });
    } else {
      // 访问的是个人主页
      const newData = { token, userName: username };
      getMyUserInfo(newData).then((myResData) => {
        if (myResData) {
          // 个人信息主页
          setIsMySelf(true);
          setUserInfo(myResData);
          setLoading(false);

          // 更新修改时显示的信息
          setUsername(myResData.userName);
          setEmail(myResData.userEmail);
          setSelectedAvatar(myResData.userImageUrl);
          setSelectedGrade(myResData.userGrade);
          setSelectedMajor(myResData.userMajor);
          setDesc(myResData.userDesc);
        }
      });
    }
  }, [params]);

  useEffect(() => {
    // 用户的提问
    if (loading) return;
    // 此时个人信息已加载完成
    const { username, token } = getSelf();
    const quesData = {
      token: token!,
      userName: isMySelf ? username! : showUserName,
      num: quesCurPage,
      pageSize,
    };
    /* console.log("quesData", quesData); */

    getMyQuestions(quesData).then((quesResData) => {
      if (quesResData) {
        setUserQuesList(quesResData.questions ? quesResData.questions : []);
        setQuesTotalPage(quesResData.pageSum);
        /* console.log("quesResData.pageSum", quesResData.pageSum); */
      }
    });
  }, [quesCurPage, showUserName, loading, isMySelf]);

  useEffect(() => {
    // 用户的回答
    if (loading) return;
    // 此时个人信息已加载完成
    const { username, token } = getSelf();
    const ansData = {
      token: token!,
      userName: isMySelf ? username! : showUserName,
      num: ansCurPage,
      pageSize,
    };
    /* console.log("ansData", ansData); */

    getMyAnswers(ansData).then((ansResData) => {
      if (ansResData) {
        /* console.log("dada", ansResData.myAnswers); */

        setUserAnsList(ansResData.myAnswers ? ansResData.myAnswers : []);
        setAnsTotalPage(ansResData.pageSum);
      }
    });
  }, [ansCurPage, showUserName, loading, isMySelf]);

  useEffect(() => {
    // 用户浏览历史
    if (loading) return;
    // 此时个人信息已加载完成
    const { username, token } = getSelf();
    const data = {
      token: token!,
      userName: isMySelf ? username! : showUserName,
    };
    /* console.log("viewData", data); */

    getMyViews(data).then((viewResData) => {
      if (viewResData) {
        setUserViewList(viewResData.myViews ? viewResData.myViews : []);

        if (viewResData.myViews) {
          setViewTotalPage(Math.ceil(viewResData.myViews.length / pageSize));
        }
      }
    });
  }, [showUserName, loading, isMySelf]);

  return (
    <div className="about">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab={`关于${isMySelf ? "我" : " TA"}`} itemKey="about">
          <div className="about-x">
            <div>
              {/* 防止高度受到 list 部分影响 */}
              <div
                className="about-x-info"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
              >
                <Skeleton
                  placeholder={
                    <Skeleton.Avatar
                      size="extra-large"
                      style={{
                        width: "96px",
                        height: "96px",
                      }}
                    />
                  }
                  loading={loading}
                >
                  <Avatar
                    size="extra-large"
                    style={{
                      width: "96px",
                      height: "96px",
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      cursor: !isMySelf ? "default" : "cursor",
                    }}
                    src={userInfo?.userImageUrl}
                    alt="User"
                    onClick={() => {
                      if (!isMySelf) return;
                      setIsImgModalShow(true);
                    }}
                  />
                </Skeleton>

                <Text link style={{ fontSize: 16 }}>
                  {userInfo?.userName}
                </Text>

                <Button
                  size="small"
                  disabled
                  style={{
                    color: "var(--semi-color-text-2)",
                    cursor: "default",
                  }}
                >{`被采纳回答数 ${userInfo?.adoptedAnswerCount}`}</Button>
                <Text>{userInfo?.userEmail}</Text>
                <Text>{`${userInfo?.userGrade} ${userInfo?.userMajor}`}</Text>
                <Paragraph
                  style={{
                    color: "var(--semi-color-text-2)",
                    textAlign: "center",
                    wordBreak: "break-all",
                  }}
                >
                  {userInfo?.userDesc}
                </Paragraph>
                {isMySelf ? (
                  <Button
                    theme="borderless"
                    style={{ transitionDuration: ".3s" }}
                    onClick={() => {
                      setIsModalShow(true);
                    }}
                  >
                    编辑资料
                  </Button>
                ) : (
                  <></>
                )}
                {isMySelf ? (
                  <Button
                    theme="light"
                    style={{ transitionDuration: ".3s" }}
                    onClick={() => {
                      removeSelf();
                    }}
                  >
                    退出登录
                  </Button>
                ) : (
                  <></>
                )}

                <Modal
                  visible={isModalShow}
                  header={null}
                  onOk={async () => {
                    if (!userInfo) return;
                    const { token } = getSelf();
                    if (!token) {
                      removeSelf();
                      return;
                    }
                    if (modalTabKey === "base") {
                      const data: UpdateMyUserInfoDataReq = {
                        ...userInfo,
                        token,
                      };
                      if (!email) {
                        showToast("请输入邮箱", "info");
                        return;
                      }
                      data.userEmail = email;
                      data.userGrade = selectedGrade;
                      data.userMajor = selectedMajor;
                      data.userDesc = desc;
                      const resData = await updateMyUserInfo(data);
                      if (resData) {
                        setUserInfo(resData);
                        showToast("基本信息修改成功", "info");
                        setIsModalShow(false);
                      }
                    } else if (modalTabKey === "username-psw") {
                      const data: UpdateUserNameOrUserPasswordDataReq = {
                        userName: username,
                        userPassword: password,
                        token,
                      };

                      const resData = await updateUserNameOrUserPassword(data);
                      if (resData) {
                        setUserInfo(resData);
                        showToast("用户名/密码修改成功", "info");
                        setIsModalShow(false);
                      }
                    }
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
                  <Tabs
                    type="button"
                    activeKey={modalTabKey}
                    onTabClick={(key) => {
                      setModalTabKey(key as "base" | "username-psw");
                    }}
                  >
                    <TabPane tab="基础信息" itemKey="base">
                      <div
                        style={{
                          paddingTop: 24,
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <Input
                          placeholder="邮箱"
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
                        <TextArea
                          maxCount={100}
                          value={desc}
                          onChange={(v) => {
                            setDesc(v);
                          }}
                        />
                      </div>
                    </TabPane>
                    <TabPane tab="用户名/密码" itemKey="username-psw">
                      <div
                        style={{
                          paddingTop: 24,
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
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
                      </div>
                    </TabPane>
                  </Tabs>
                </Modal>

                <Modal
                  visible={isImgModalShow}
                  header={null}
                  onOk={async () => {
                    if (!userInfo) return;
                    const { token } = getSelf();
                    if (!token) {
                      removeSelf();
                      return;
                    }
                    const data: UpdateMyUserInfoDataReq = {
                      ...userInfo,
                      token,
                    };
                    // 在原本基础信息的基础上，更新头像
                    data.userImageUrl = selectedAvatar;
                    /* console.log(data); */

                    const resData = await updateMyUserInfo(data);
                    if (resData) {
                      setUserInfo(resData);
                      showToast("头像修改成功", "info");
                      setIsImgModalShow(false);
                    }
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
                    {AVATARURLLIST.map((avatar) => (
                      <Avatar
                        key={avatar}
                        src={avatar}
                        onClick={() => {
                          setSelectedAvatar(avatar);
                        }}
                        style={{
                          borderColor:
                            selectedAvatar === avatar
                              ? "var(--semi-color-carrot)"
                              : "white",
                        }}
                      />
                    ))}
                  </AvatarGroup>
                </Modal>
              </div>
            </div>
            <div className="about-x-list">
              <Tabs type="button">
                <TabPane
                  tab={`${isMySelf ? "我" : "TA "}的提问`}
                  itemKey="ques"
                >
                  <div className="about-x-list-wrapper">
                    {userQuesList.length > 0
                      ? userQuesList.map((userQues) => (
                          <AboutQuesBar
                            id={userQues.questionId}
                            key={userQues.questionId}
                            title={userQues.questionTitle}
                            timeStamp={userQues.createTime}
                            isSolved={userQues.hasAdoption}
                            ansCount={userQues.answerCount}
                          />
                        ))
                      : "暂时空空如也呢......"}
                    {quesTotalPage > 1 ? (
                      <MyPagination
                        totalPage={quesTotalPage}
                        curPage={quesCurPage}
                        setCurPage={setQuesCurPage}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </TabPane>
                <TabPane tab={`${isMySelf ? "我" : "TA "}的回答`} itemKey="ans">
                  <div className="about-x-list-wrapper">
                    {userAnsList.length > 0
                      ? userAnsList.map((userAns) => {
                          return (
                            <AboutAnsBar
                              id={userAns.questionId}
                              key={userAns.questionId + userAns.answerTime}
                              title={userAns.questionTitle}
                              timeStamp={userAns.answerTime}
                              isSolved={userAns.hasAdoption}
                              isSolvedByMe={userAns.isMineAdoption}
                            />
                          );
                        })
                      : "暂时空空如也呢......"}
                    {ansTotalPage > 1 ? (
                      <MyPagination
                        totalPage={ansTotalPage}
                        curPage={ansCurPage}
                        setCurPage={setAnsCurPage}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </TabPane>
                {isMySelf ? (
                  <TabPane tab="浏览记录" itemKey="history">
                    <div className="about-x-list-wrapper">
                      {userViewList.length > 0
                        ? [
                            ...userViewList.slice(
                              (viewCurPage - 1) * pageSize,
                              Math.min(
                                userViewList.length,
                                viewCurPage * pageSize
                              )
                            ),
                          ].map((userView) => (
                            <AboutHistoryBar
                              id={userView.question.questionID}
                              key={userView.question.questionID}
                              title={userView.question.questionTitle}
                              timeStamp={userView.viewTime}
                              isSolved={userView.question.hasAdopt}
                              ansCount={userView.question.answerCount}
                            />
                          ))
                        : "暂时空空如也呢......"}
                      {viewTotalPage > 1 ? (
                        <MyPagination
                          totalPage={viewTotalPage}
                          curPage={viewCurPage}
                          setCurPage={setViewCurPage}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </TabPane>
                ) : (
                  <></>
                )}
              </Tabs>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default About;
