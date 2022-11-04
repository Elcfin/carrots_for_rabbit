import "./index.scss";
import { Typography, Card, Button } from "@douyinfe/semi-ui";
import { useScreen } from "../../../../hooks/useScreen";

interface AboutAnsBarPropsType {
  title: string;
  timeStamp: number;
  isSolvedByMe: boolean;
  isSolved: boolean;
}

const AboutAnsBar = (props: AboutAnsBarPropsType) => {
  const { Title, Text } = Typography;
  const { title, timeStamp, isSolved, isSolvedByMe } = props;
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
      <div className="about-ans-bar">
        <div className="about-ans-bar-main">
          <div className="about-ans-bar-main-title">
            <Title heading={6}>{title}</Title>
          </div>

          <div className="about-ans-bar-main-bottom">
            <div className="about-ans-bar-main-bottom-ans_count">
              {isSolved && isSolvedByMe}
              <Button
                size="small"
                theme="borderless"
                disabled
                style={{
                  color: "var(--semi-color-text-2)",
                  cursor: "default",
                  padding: 0,
                }}
              >{`回答被采纳`}</Button>
            </div>

            <div className="about-ans-bar-main-bottom-info">
              <Text style={{ color: "var(--semi-color-text-2)" }}>
                {`回答时间：${date.getFullYear()} 年 ${
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

export default AboutAnsBar;
