import "./index.scss";
import { Card, Typography } from "@douyinfe/semi-ui";
import { useScreen } from "../../../../hooks/useScreen";

interface TagPartPropsType {
  title: string;
  desc: string;
}

const TagPart = (props: TagPartPropsType) => {
  const { title, desc } = props;
  const { Paragraph } = Typography;
  const { isMobile } = useScreen();
  return (
    <div className="tag_part">
      <Card
        className="tag_part-card"
        bordered={false}
        headerLine={true}
        title={title}
      >
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ height: isMobile ? "auto" : 40 }}
        >
          {desc}
        </Paragraph>
      </Card>
    </div>
  );
};
export default TagPart;
