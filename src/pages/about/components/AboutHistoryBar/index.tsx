import "./index.scss";
import { Typography, Card, Button } from "@douyinfe/semi-ui";
import { useScreen } from "../../../../hooks/useScreen";
import { getDateString } from "../../../../utils/getDateString";
import { useNavigate } from "react-router";

interface AboutHistoryBarPropsType {
  id: number;
  title: string;
  timeStamp: number;
  isSolved: boolean;
  ansCount: number;
}

const AboutHistoryBar = (props: AboutHistoryBarPropsType) => {
  const { Title, Text } = Typography;
  const { title, timeStamp, isSolved, ansCount, id } = props;
  const navigate = useNavigate();

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
            <Title
              heading={6}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/show_ques/${id}`);
              }}
            >
              {title}
            </Title>
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
                {`浏览时间：${getDateString(timeStamp)}`}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AboutHistoryBar;
