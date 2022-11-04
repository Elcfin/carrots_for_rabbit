import "./index.scss";
import { Typography, Card, Button } from "@douyinfe/semi-ui";
import { useScreen } from "../../../../hooks/useScreen";

interface AboutHistoryBarPropsType {
  title: string;
  timeStamp: number;
  isSolved: boolean;
  ansCount: number;
}

const AboutHistoryBar = (props: AboutHistoryBarPropsType) => {
  const { Title, Text } = Typography;
  const { title, timeStamp, isSolved, ansCount } = props;
  const { isMobile } = useScreen();
  const date = new Date(timeStamp);

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        backgroundColor: "var(--semi-color-bg-0)",
        border: 0,
        borderRadius: 0,
      }}
    >
      <div className="about-history-bar">
        <div className="about-history-bar-main">
          <div className="about-history-bar-main-title">
            <Title heading={6}>{title}</Title>
          </div>

          <div className="about-history-bar-main-bottom">
            <div className="about-history-bar-main-bottom-ans_count">
              <Button
                size="small"
                theme="borderless"
                disabled
                style={{
                  color: "var(--semi-color-text-2)",
                  cursor: "default",
                  padding: 0,
                }}
              >{`回答数 ${ansCount}${isSolved ? " | 已解决" : ""}`}</Button>
            </div>

            <div className="about-history-bar-main-bottom-info">
              <Text style={{ color: "var(--semi-color-text-2)" }}>
                {`浏览时间：${date.getFullYear()} 年 ${
                  date.getMonth() + 1
                } 月 ${date.getDay()} 日 `}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AboutHistoryBar;
