import "./index.scss";
import { Typography, Card, Button, Dropdown } from "@douyinfe/semi-ui";
import { useScreen } from "../../hooks/useScreen";
import { IconHeartStroked, IconMoreStroked } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router";
import { getDateString } from "../../utils/getDateString";
import { getIsLogin } from "../../utils/getSelf";
import { showToast } from "../../utils/showToast";

interface QuestionBarPropsType {
  questionId: number;
  answerCount: number;
  title: string;
  tagList: string[];
  username: string;
  timeStamp: number;
  content: string;
  isSolved: boolean;
  isRecommend: boolean;
}

const QuestionBar = (props: QuestionBarPropsType) => {
  const { Title, Text, Paragraph } = Typography;
  const {
    answerCount,
    title,
    tagList,
    username,
    timeStamp,
    content,
    isSolved,
    isRecommend,
    questionId,
  } = props;
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  const isLogin = getIsLogin();

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        backgroundColor: "var(--semi-color-bg-0)",
        border: 0,
        borderRadius: 0,
      }}
    >
      <div className="question-bar">
        <div className="question-bar-main">
          <div className="question-bar-main-title">
            <Title
              heading={6}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/show_ques/${questionId}`);
              }}
            >
              {title}
            </Title>
          </div>

          <div className="question-bar-main-content">
            <Paragraph ellipsis={{ rows: 2 }}>
              {content.split("\n").map((p, index) => (
                <Paragraph key={index} style={{ wordBreak: "break-all" }}>
                  {p}
                </Paragraph>
              ))}
            </Paragraph>
          </div>

          <div className="question-bar-main-bottom">
            <div className="question-bar-main-bottom-ans_count">
              <Button
                size="small"
                disabled
                style={{ color: "var(--semi-color-carrot)", cursor: "default" }}
              >{`????????? ${answerCount} ${isSolved ? "- ?????????" : ""}`}</Button>
            </div>
            <div className="question-bar-main-bottom-right">
              <div className="question-bar-main-bottom-tags">
                {tagList.map((tag) => (
                  <Button
                    key={tag}
                    size="small"
                    theme="light"
                    style={{ color: "var(--semi-color-text-2)" }}
                    onClick={() => {
                      navigate(`/tag/${tag}`);
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              {!isMobile && (
                <div className="question-bar-main-bottom-info">
                  <Text style={{ color: "var(--semi-color-text-2)" }}>
                    {`${getDateString(timeStamp)}`}
                  </Text>
                  <Text
                    link
                    onClick={() => {
                      if (!isLogin) {
                        showToast("??????????????????????????????????????????", "info");
                        return;
                      }
                      navigate(`/about/${username}`);
                    }}
                  >
                    {username}
                  </Text>
                  {isRecommend && (
                    <div className="question-bar-main-bottom-info-actions">
                      <Button size="small" icon={<IconHeartStroked />} />
                      <Button size="small" icon={<IconMoreStroked />} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {isMobile && (
              <div className="question-bar-main-bottom-info">
                <Text style={{ color: "var(--semi-color-text-2)" }}>
                  {`${getDateString(timeStamp)}`}
                </Text>
                <Text link>{username}</Text>
                {isRecommend && (
                  <div className="question-bar-main-bottom-info-actions">
                    <Button size="small" icon={<IconHeartStroked />} />
                    <Dropdown
                      trigger={"hover"}
                      position={"bottomRight"}
                      render={
                        <Dropdown.Menu>
                          <Dropdown.Item>????????????????????????</Dropdown.Item>
                        </Dropdown.Menu>
                      }
                    >
                      <Button size="small" icon={<IconMoreStroked />} />
                    </Dropdown>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionBar;
