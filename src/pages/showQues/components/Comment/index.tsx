import "./index.scss";
import { Typography } from "@douyinfe/semi-ui";
import { getDateString } from "../../../../utils/getDateString";

interface CommentProp {
  content: string;
  username: string;
  time: number;
}

const Comment = (prop: CommentProp) => {
  const { Text } = Typography;
  const { username, content, time } = prop;
  return (
    <div className="comment">
      <Text link style={{ fontSize: 12 }}>{`${username}`}</Text>
      <Text style={{ fontSize: 12 }}>{`：${content}`}</Text>
      <div
        style={{
          fontSize: 12,
          color: "var(--semi-color-text-2)",
          textAlign: "right",
        }}
      >
        {`${getDateString(time)}`}
      </div>
    </div>
  );
};

export default Comment;
