import "./index.scss";
import { Card } from "@douyinfe/semi-ui";

interface TagPartPropsType {
  title: string;
  desc: string;
}

const TagPart = (props: TagPartPropsType) => {
  const { title, desc } = props;
  return (
    <div className="tag_part">
      <Card
        className="tag_part-card"
        bordered={false}
        headerLine={true}
        title={title}
      >
        {desc}
      </Card>
    </div>
  );
};
export default TagPart;
