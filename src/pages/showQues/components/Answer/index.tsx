import {
  IconDislikeThumb,
  IconLikeThumb,
  IconMoreStroked,
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
import { getSelf, removeSelf } from "../../../../utils/getSelf";
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
interface AnswerProps {
  answerId: number;
  username: string;
  avatar: string;
  time: number;
  content: string;
  likesCount: number;
  isAdopted: boolean;
}

const Answer = (props: AnswerProps) => {
  const { avatar, username, time, content, answerId, likesCount } = props;
  const { Text, Paragraph } = Typography;

  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  const [isWrite, setIsWrite] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [curLikesCount, setCurLikesCount] = useState(likesCount);

  useEffect(() => {
    const data: GetAllCommentOfAnswerDataReq = { answerId };
    getAllCommentOfAnswer(data).then((resData) => {
      if (resData) {
        setCommentList(resData.comments ? resData.comments : []);
      }
    });
  }, [answerId]);

  const handlePublishComment = async () => {
    if (!commentContent) {
      showToast("评论内容不能为空", "info");
      return;
    }
    const { token } = getSelf();
    if (!token) {
      showToast("身份信息失效，请重新登录", "info");
      removeSelf();
      return;
    }

    const data: InsertCommentDataReq = {
      token,
      answerId,
      content: commentContent,
    };

    const resData = await insertComment(data);
    if (resData) {
      showToast("评论成功", "info");
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
      showToast("需要先登录才可以对回答点赞", "info");
      return;
    }
    const data: likeAnswerDataReq = { token, like: true, answerId };
    const resData = await likeAnswer(data);
    if (resData) {
      showToast("点赞成功", "info");
      setCurLikesCount((curLikesCount) => curLikesCount + 1);
    }
  };
  const handleUnlikeBtnClick = async (answerId: number) => {
    const { token } = getSelf();
    if (!token) {
      showToast("需要先登录才可以对回答表示不喜欢", "info");
      return;
    }
    const data: UnlikeAnswerDataReq = { token, unlike: true, answerId };
    const resData = await unlikeAnswer(data);
    if (resData) {
      showToast("收到反馈", "info");
    }
  };

  return (
    <div className="answer">
      <div className="answer-info">
        <div className="answer-info-user">
          <Avatar size="small" style={{ margin: 4 }} src={avatar} alt="User" />
          <Text link>{username}</Text>
        </div>
        <Text style={{ color: "var(--semi-color-text-2)" }}>
          {`回答时间：${getDateString(time)}`}
        </Text>
      </div>
      <div className="answer-content">
        <Paragraph spacing="extended">
          {content.split("\n").map((p) => (
            <Paragraph>{p}</Paragraph>
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
          回复
        </div>
        <div className="answer-bottom-actions">
          <Button
            onClick={() => {
              handleLikeBtnClick(answerId);
            }}
            size="small"
            icon={
              <IconLikeThumb style={{ color: "var(--semi-color-text-2)" }} />
            }
          >
            {curLikesCount}
          </Button>
          <Dropdown
            trigger={"hover"}
            position={"bottom"}
            render={
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    handleUnlikeBtnClick(answerId);
                  }}
                >
                  不喜欢
                </Dropdown.Item>
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
              提交评论
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
              username={comment.userName}
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
