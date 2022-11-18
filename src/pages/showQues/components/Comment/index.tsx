import "./index.scss";
import { Button, Typography } from "@douyinfe/semi-ui";
import { getDateString } from "../../../../utils/getDateString";
import { useState } from "react";
import {
  getIsLogin,
  getIsManager,
  getSelf,
  removeSelf,
} from "../../../../utils/getSelf";
import {
  deleteComment,
  DeleteCommentDataReq,
} from "../../../../api/http/comment/deleteComment";
import { showToast } from "../../../../utils/showToast";
import { IconDeleteStroked } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router";

interface CommentProp {
  content: string;
  commentWriter: string;
  time: number;
  id: number;
  setUpdateComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const Comment = (prop: CommentProp) => {
  const { Text } = Typography;
  const { commentWriter, content, time, id, setUpdateComments } = prop;
  const { username } = getSelf();
  const [isMySelf, setIsMySelf] = useState(commentWriter === username);
  const isManager = getIsManager();
  const isLogin = getIsLogin();
  const navigate = useNavigate();
  const handleDeleteBtnClick = async () => {
    const { token } = getSelf();
    if (!token) {
      showToast("身份信息失效，请重新登录", "info");
      removeSelf();
      return;
    }
    const data: DeleteCommentDataReq = { token, answerCommentId: id };
    const resData = await deleteComment(data);
    if (resData) {
      showToast("删除成功", "info");
      setUpdateComments((updateComments) => !updateComments);
    }
  };

  return (
    <div className="comment">
      <Text
        link
        style={{ fontSize: 12 }}
        onClick={() => {
          if (!isLogin) {
            showToast("需要先登录才可以查看用户信息", "info");
            return;
          }
          navigate(`/about/${commentWriter}`);
        }}
      >{`${commentWriter}`}</Text>
      <Text
        style={{ fontSize: 12, wordBreak: "break-all" }}
      >{`：${content}`}</Text>
      <div
        style={{
          fontSize: 12,
          color: "var(--semi-color-text-2)",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <div> {`${getDateString(time)}`}</div>
        {isMySelf || isManager ? (
          <Button
            size="small"
            onClick={() => {
              handleDeleteBtnClick();
            }}
            icon={<IconDeleteStroked />}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Comment;
