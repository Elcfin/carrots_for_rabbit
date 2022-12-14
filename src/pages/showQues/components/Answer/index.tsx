import {
  IconDislikeThumb,
  IconLikeThumb,
  IconMoreStroked,
  IconSendStroked,
} from "@douyinfe/semi-icons";
import {
  Avatar,
  Button,
  Dropdown,
  TextArea,
  Typography,
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import {
  CommentItemType,
  getAllCommentOfAnswer,
  GetAllCommentOfAnswerDataReq,
} from "../../../../api/http/comment/getAllCommentOfAnswer";
import Comment from "../Comment";
import { getDateString } from "../../../../utils/getDateString";
import "./index.scss";
import { showToast } from "../../../../utils/showToast";
import {
  getIsLogin,
  getIsManager,
  getSelf,
  removeSelf,
} from "../../../../utils/getSelf";
import {
  insertComment,
  InsertCommentDataReq,
} from "../../../../api/http/comment/insertComment";
import {
  likeAnswer,
  likeAnswerDataReq,
} from "../../../../api/http/user/likeAnswer";
import {
  unlikeAnswer,
  UnlikeAnswerDataReq,
} from "../../../../api/http/user/unlikeAnswer";
import {
  deleteAnswer,
  DeleteAnswerDataReq,
} from "../../../../api/http/answer/deleteAnswer";
import { useNavigate } from "react-router";
import {
  adoptAnswer,
  AdoptAnswerDataReq,
} from "../../../../api/http/answer/adoptAnswer";
interface AnswerProps {
  answerId: number;
  answerWriter: string;
  avatar: string;
  time: number;
  content: string;
  likesCount: number;
  isAdopted: boolean;
  setUpdateAnswers: React.Dispatch<React.SetStateAction<boolean>>;
  isShowAdoptBtn: boolean;
}

const Answer = (props: AnswerProps) => {
  const {
    avatar,
    answerWriter,
    time,
    content,
    answerId,
    likesCount,
    isAdopted,
    setUpdateAnswers,
    isShowAdoptBtn,
  } = props;
  const { Text, Paragraph } = Typography;

  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [isWrite, setIsWrite] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { username } = getSelf();
  const [isMySelf, setIsMySelf] = useState(answerWriter === username);
  const [updateComments, setUpdateComments] = useState(false);
  const isManager = getIsManager();
  const isLogin = getIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const data: GetAllCommentOfAnswerDataReq = { answerId };
    getAllCommentOfAnswer(data).then((resData) => {
      if (resData) {
        setCommentList(resData.comments ? resData.comments : []);
      }
    });
  }, [answerId, updateComments]);

  const handlePublishComment = async () => {
    const { token } = getSelf();
    if (!token) {
      showToast("??????????????????????????????", "info");
      return;
    }
    if (!commentContent) {
      showToast("????????????????????????", "info");
      return;
    }

    const data: InsertCommentDataReq = {
      token,
      answerId,
      content: commentContent,
    };

    const resData = await insertComment(data);
    if (resData) {
      showToast("????????????", "info");
      setCommentContent("");
      const resNewData = await getAllCommentOfAnswer(data);
      if (resNewData) {
        setCommentList(resNewData.comments ? resNewData.comments : []);
      }
    }
  };

  const handleLikeBtnClick = async (answerId: number) => {
    const { token } = getSelf();
    if (!token) {
      showToast("???????????????????????????????????????", "info");
      return;
    }
    const data: likeAnswerDataReq = { token, like: true, answerId };
    const resData = await likeAnswer(data);
    if (resData) {
      showToast("????????????", "info");
      setUpdateAnswers((updateAnswers) => !updateAnswers);
    }
  };
  const handleUnlikeBtnClick = async (answerId: number) => {
    const { token } = getSelf();
    if (!token) {
      showToast("????????????????????????????????????????????????", "info");
      return;
    }
    const data: UnlikeAnswerDataReq = { token, unlike: true, answerId };
    const resData = await unlikeAnswer(data);
    if (resData) {
      showToast("????????????", "info");
    }
  };

  return (
    <div className="answer">
      <div className="answer-info">
        <div className="answer-info-user">
          <Avatar size="small" style={{ margin: 4 }} src={avatar} alt="User" />
          <Text
            link
            onClick={() => {
              if (!isLogin) {
                showToast("??????????????????????????????????????????", "info");
                return;
              }
              navigate(`/about/${answerWriter}`);
            }}
          >
            {answerWriter}
          </Text>
        </div>
        <Text style={{ color: "var(--semi-color-text-2)" }}>
          {`???????????????${getDateString(time)}`}
        </Text>
      </div>
      <div className="answer-content">
        <Paragraph spacing="extended">
          {content.split("\n").map((p) => (
            <Paragraph style={{ wordBreak: "break-all" }}>{p}</Paragraph>
          ))}
        </Paragraph>
      </div>
      <div className="answer-bottom">
        <div
          className="answer-bottom-comment"
          onClick={() => {
            setIsWrite((isWrite) => !isWrite);
          }}
        >
          <Text>??????</Text>
        </div>
        <div className="answer-bottom-actions">
          {isAdopted ? (
            <Button
              style={{ color: "var(--semi-color-carrot)", cursor: "default" }}
              disabled
              size="small"
            >
              ???????????????
            </Button>
          ) : isShowAdoptBtn ? (
            <Button
              onClick={async () => {
                const { token } = getSelf();
                if (!token) {
                  showToast("????????????????????????????????????", "info");
                  removeSelf();
                  return;
                }
                const data: AdoptAnswerDataReq = { token, answerId };
                const resData = await adoptAnswer(data);
                if (resData) {
                  showToast("????????????", "info");
                  setUpdateAnswers((updateAnswers) => !updateAnswers);
                }
              }}
              size="small"
            >
              ??????
            </Button>
          ) : (
            <></>
          )}

          <Button
            onClick={() => {
              handleLikeBtnClick(answerId);
            }}
            size="small"
            icon={
              <IconLikeThumb style={{ color: "var(--semi-color-text-2)" }} />
            }
          >
            {likesCount}
          </Button>
          <Dropdown
            trigger={"hover"}
            position={"bottom"}
            render={
              <Dropdown.Menu>
                {!isMySelf ? (
                  <Dropdown.Item
                    onClick={() => {
                      handleUnlikeBtnClick(answerId);
                    }}
                  >
                    ?????????
                  </Dropdown.Item>
                ) : (
                  <></>
                )}
                {isMySelf || isManager ? (
                  <Dropdown.Item
                    onClick={async () => {
                      const { token } = getSelf();
                      if (!token) {
                        showToast("????????????????????????????????????", "info");
                        removeSelf();
                        return;
                      }
                      const data: DeleteAnswerDataReq = {
                        token,
                        answerId,
                      };
                      const resData = await deleteAnswer(data);
                      if (resData) {
                        showToast("????????????", "info");
                        setUpdateAnswers((updateAnswer) => !updateAnswer);
                      }
                    }}
                  >
                    ??????
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
      {isWrite ? (
        <div className="answer-write">
          <TextArea
            value={commentContent}
            onChange={(v) => {
              setCommentContent(v);
            }}
            autosize
            rows={1}
          />
          <div>
            <Button
              onClick={() => {
                handlePublishComment();
              }}
            >
              ????????????
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {commentList.length > 0 ? (
        <div className="answer-comments">
          {commentList.map((comment) => (
            <Comment
              setUpdateComments={setUpdateComments}
              id={comment.commentId}
              commentWriter={comment.userName}
              content={comment.content}
              time={comment.createTime}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Answer;
