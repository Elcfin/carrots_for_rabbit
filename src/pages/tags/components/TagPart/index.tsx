import "./index.scss";
import { Card, Typography } from "@douyinfe/semi-ui";
import { useScreen } from "../../../../hooks/useScreen";
import { useNavigate } from "react-router";

interface TagPartPropsType {
  title: string;
  desc: string;
}

const TagPart = (props: TagPartPropsType) => {
  const { title, desc } = props;
  const { Paragraph, Title } = Typography;
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  return (
    <div className="tag_part">
      <Card
        className="tag_part-card"
        bordered={false}
        headerLine={true}
        title={title}
        header={
          <Title
            heading={6}
            onClick={() => {
              navigate(`/tag/${title}`);
            }}
            style={{ cursor: "pointer" }}
          >
            {title}
          </Title>
        }
      >
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ height: isMobile ? "auto" : 40, wordBreak: "break-all" }}
        >
          {desc}
        </Paragraph>
      </Card>
    </div>
  );
};
export default TagPart;
