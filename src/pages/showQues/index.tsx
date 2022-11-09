import "./index.scss";
import {
  Button,
  TabPane,
  Tabs,
  TextArea,
  Typography,
  Avatar,
  Divider,
  ButtonGroup,
  Dropdown,
} from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router";

import { useEffect, useState } from "react";
import MyCarousel from "../../components/MyCarousel";
import { useScreen } from "../../hooks/useScreen";
import { getIsManager, getSelf, removeSelf } from "../../utils/getSelf";
import { showToast } from "../../utils/showToast";
import {
  getConciseQuestionByQuestionId,
  GetConciseQuestionByQuestionIdRes,
} from "../../api/http/question/getConciseQuestionByQuestionId";
import { getDateString } from "../../utils/getDateString";
import Answer from "./components/Answer";
import {
  AnswerItemType,
  getAllAnswerOfQuestion,
  GetAllAnswerOfQuestionDataReq,
} from "../../api/http/answer/getAllAnswerOfQuestion";
import {
  insertAnswer,
  InsertAnswerDataReq,
} from "../../api/http/answer/insertAnswer";
import { IconLikeThumb, IconMoreStroked } from "@douyinfe/semi-icons";
import {
  likeQuestion,
  likeQuestionDataReq,
} from "../../api/http/user/likeQuestion";
import {
  unlikeQuestion,
  UnlikeQuestionDataReq,
} from "../../api/http/user/unlikeQuestion";
import {
  deleteQuestion,
  DeleteQuestionDataReq,
} from "../../api/http/question/deleteQuestion";

const ShowQues = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isMySelf, setIsMySelf] = useState(false);
  const [hasIAnswered, setHasIAnswered] = useState(true);
  const [id, setId] = useState(-1);
  const [answerContent, setAnswerContent] = useState("");
  const [quesInfo, setQuesInfo] = useState<GetConciseQuestionByQuestionIdRes>();
  const [ansList, setAnsList] = useState<AnswerItemType[]>([]);
  const [curLikesCount, setCurLikesCount] = useState(0);
  const [updateAnswers, setUpdateAnswers] = useState(false);
  const isManager = getIsManager();

  useEffect(() => {
    if (!params.id) {
      showToast("该问题不存在", "info");
      navigate("/home");
      return;
    }

    if (params.id) {
      const pId = parseInt(params.id);
      setId(pId);
      const { token } = getSelf();

      const data = token
        ? {
            questionId: pId,
            token,
          }
        : { questionId: pId };
      getConciseQuestionByQuestionId(data).then((resData) => {
        if (resData) {
          const { username } = getSelf();
          if (username) setIsMySelf(resData.userName === username);
          setQuesInfo(resData);
          setCurLikesCount(resData.likesCount);
          const newData: GetAllAnswerOfQuestionDataReq = {
            questionId: pId,
          };
          getAllAnswerOfQuestion(newData).then((resNewData) => {
            if (resNewData) {
              setAnsList(resNewData.answers ? resNewData.answers : []);
              setHasIAnswered(() => {
                return !!(
                  resNewData.answers &&
                  resNewData.answers.find((ans) => ans.userName === username)
                );
              });
            }
          });
        }
      });
    }
  }, [params, updateAnswers]);

  const handlePublishAnswer = async () => {
    if (!answerContent) {
      showToast("回答内容不能为空", "info");
      return;
    }
    const { token } = getSelf();
    if (!token) {
      showToast("身份信息失效，请重新登录", "info");
      removeSelf();
      return;
    }
    const data: InsertAnswerDataReq = {
      questionId: id,
      token,
      content: answerContent,
    };
    const resData = await insertAnswer(data);
    if (resData) {
      showToast("回答成功", "info");
      setAnswerContent("");
      setHasIAnswered(true);
      const newData: GetAllAnswerOfQuestionDataReq = {
        questionId: id,
      };
      const resNewData = await getAllAnswerOfQuestion(newData);
      if (resNewData) {
        setAnsList(resNewData.answers ? resNewData.answers : []);
      }
    }
  };

  const handleLikeBtnClick = async () => {
    const { token } = getSelf();
    if (!token) {
      showToast("需要先登录才可以对问题点赞", "info");
      return;
    }
    if (!quesInfo?.questionID) return;
    const data: likeQuestionDataReq = {
      token,
      like: true,
      questionId: quesInfo?.questionID,
    };
    const resData = await likeQuestion(data);
    if (resData) {
      showToast("点赞成功", "info");
      setCurLikesCount((curLikesCount) => curLikesCount + 1);
    }
  };

  const handleUnlikeBtnClick = async () => {
    const { token } = getSelf();
    if (!token) {
      showToast("需要先登录才可以对问题表示不喜欢", "info");
      return;
    }
    if (!quesInfo?.questionID) return;
    const data: UnlikeQuestionDataReq = {
      token,
      unlike: true,
      questionId: quesInfo?.questionID,
    };
    const resData = await unlikeQuestion(data);
    if (resData) {
      showToast("收到反馈", "info");
    }
  };

  const { Title, Paragraph, Text } = Typography;
  const { isMobile } = useScreen();
  return (
    <div className="show_ques">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane
          tab={`问题详情`}
          itemKey="search"
          style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
        >
          <div
            className="show_ques-x"
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
          >
            <div className="show_ques-x-header">
              <Title heading={isMobile ? 6 : 5}>{quesInfo?.title}</Title>
            </div>
            {quesInfo?.tags ? (
              <div className="show_ques-x-tags">
                {(quesInfo?.tags ? quesInfo?.tags : []).map((tag) => (
                  <Button
                    size={"small"}
                    style={{
                      color: "var(--semi-color-carrot-dark)",
                    }}
                    onClick={() => {
                      navigate(`/tag/${tag}`);
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            ) : (
              <></>
            )}

            <div className="show_ques-x-info">
              <div className="show_ques-x-info-user">
                <Avatar
                  size="small"
                  style={{ margin: 4 }}
                  src={quesInfo?.userAvatar}
                  alt="User"
                />
                <Text
                  link
                  onClick={() => {
                    if (quesInfo?.userName)
                      navigate(`/about/${quesInfo?.userName}`);
                  }}
                >
                  {quesInfo?.userName}
                </Text>
              </div>
              <Text style={{ color: "var(--semi-color-text-2)" }}>
                {`发布时间：${getDateString(
                  quesInfo?.createTime ? quesInfo?.createTime : -1
                )}`}
              </Text>
            </div>
            {quesInfo?.questionImages && quesInfo?.questionImages.length > 0 ? (
              <div className="show_ques-x-imgs">
                <MyCarousel
                  imgList={
                    quesInfo?.questionImages ? quesInfo?.questionImages : []
                  }
                />
              </div>
            ) : (
              <></>
            )}
            <div className="show_ques-x-content">
              <Paragraph spacing="extended">
                {quesInfo?.content.split("\n").map((p) => (
                  <Paragraph>{p}</Paragraph>
                ))}
              </Paragraph>
            </div>
            <div className="show_ques-x-actions">
              {isMySelf ? (
                <Button
                  theme="solid"
                  onClick={() => {
                    if (!quesInfo?.questionID) return;
                    navigate(`/ask_ques/${quesInfo?.questionID}`);
                  }}
                  size="small"
                >
                  修改问题
                </Button>
              ) : (
                <></>
              )}
              <Button
                onClick={() => {
                  handleLikeBtnClick();
                }}
                size="small"
                icon={
                  <IconLikeThumb
                    style={{ color: "var(--semi-color-text-2)" }}
                  />
                }
              >
                {curLikesCount}
              </Button>
              <Dropdown
                trigger={"hover"}
                position={"bottom"}
                render={
                  <Dropdown.Menu>
                    {!isMySelf ? (
                      <Dropdown.Item
                        onClick={() => {
                          handleUnlikeBtnClick();
                        }}
                      >
                        不喜欢
                      </Dropdown.Item>
                    ) : (
                      <></>
                    )}
                    {isMySelf || isManager ? (
                      <Dropdown.Item
                        onClick={async () => {
                          const { token } = getSelf();
                          if (!token) {
                            showToast("身份信息失效，请重新登录", "info");
                            removeSelf();
                            return;
                          }
                          if (!quesInfo?.questionID) return;
                          const data: DeleteQuestionDataReq = {
                            token,
                            questionId: quesInfo?.questionID,
                          };
                          const resData = await deleteQuestion(data);
                          if (resData) {
                            showToast("删除成功", "info");
                            navigate("/home");
                          }
                        }}
                      >
                        删除
                      </Dropdown.Item>
                    ) : (
                      <></>
                    )}
                  </Dropdown.Menu>
                }
              >
                <Button size="small" icon={<IconMoreStroked />} />
              </Dropdown>
            </div>
          </div>
          {ansList.length > 0 ? (
            <>
              <Divider margin="12px" align="center">
                {`${ansList.length} 个回答`}
              </Divider>
              <div
                className="show_ques-answers"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
              >
                {ansList.map((ans, index) => (
                  <>
                    {index ? <Divider margin="8px" /> : <></>}
                    <Answer
                      isShowAdoptBtn={isMySelf}
                      setUpdateAnswers={setUpdateAnswers}
                      answerId={ans.answerId}
                      answerWriter={ans.userName}
                      avatar={ans.userImage}
                      time={ans.createTime}
                      content={ans.content}
                      likesCount={ans.likesCount}
                      isAdopted={ans.isAdopted}
                    />
                  </>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          {!isMySelf && !hasIAnswered ? (
            <>
              <Divider margin="12px" align="center">
                {`撰写回答`}
              </Divider>
              <div
                className="show_ques-write"
                style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
              >
                <TextArea
                  autosize
                  placeholder="内容描述"
                  value={answerContent}
                  onChange={(v) => {
                    setAnswerContent(v);
                  }}
                />
                <div>
                  <Button
                    onClick={() => {
                      handlePublishAnswer();
                    }}
                  >
                    提交回答
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShowQues;
