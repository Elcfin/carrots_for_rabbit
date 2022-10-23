import "./index.scss";
import { Typography, Card, Tag, Button, Dropdown } from "@douyinfe/semi-ui";
import { TagProps } from "@douyinfe/semi-ui/lib/es/tag";
import { useScreen } from "../../hooks/useScreen";
import { IconHeartStroked, IconMoreStroked } from "@douyinfe/semi-icons";

interface QuestionBarPropsType {
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
  } = props;
  const { isMobile } = useScreen();
  const date = new Date(timeStamp);
  const curDate = new Date();

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        backgroundColor: "var(--semi-color-bg-0)",
        border: 0,
        borderRadius: 0,
        /* boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px", */
      }}
    >
      <div className="question-bar">
        <div className="question-bar-main">
          <div className="question-bar-main-title">
            <Title heading={6}>{title}</Title>
          </div>

          <div className="question-bar-main-content">
            <Paragraph ellipsis={{ rows: 2 }}>
              {content.split("\n").map((p) => (
                <Paragraph>{p}</Paragraph>
              ))}
            </Paragraph>
          </div>

          <div className="question-bar-main-bottom">
            <div className="question-bar-main-bottom-ans_count">
              <Button
                size="small"
                disabled
                style={{ color: "var(--semi-color-carrot)", cursor: "default" }}
              >{`回答数 ${answerCount} ${isSolved ? "| 已解决" : ""}`}</Button>
            </div>
            <div className="question-bar-main-bottom-right">
              <div className="question-bar-main-bottom-tags">
                {tagList.map((tag) => (
                  <Button
                    size="small"
                    theme="light"
                    style={{ color: "var(--semi-color-text-2)" }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
              {!isMobile && (
                <div className="question-bar-main-bottom-info">
                  <Text style={{ color: "var(--semi-color-text-2)" }}>
                    {`${date.getFullYear()} 年 ${
                      date.getMonth() + 1
                    } 月 ${date.getDay()} 日 `}
                  </Text>
                  <Text link>{username}</Text>
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
                  {`${date.getFullYear()} 年 ${
                    date.getMonth() + 1
                  } 月 ${date.getDay()} 日 `}
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
                          <Dropdown.Item>不再推荐类似问题</Dropdown.Item>
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
