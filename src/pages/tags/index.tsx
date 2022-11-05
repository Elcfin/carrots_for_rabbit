import "./index.scss";

import { TabPane, Tabs } from "@douyinfe/semi-ui";
import TagPart from "./components/TagPart";
import { TAGINFOLIST } from "../../constants/info";

const Tags = () => {
  return (
    <div className="tags">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab={`标签`} itemKey="tag">
          <div className="tags-x">
            <div className="tags-x-list">
              {TAGINFOLIST.map((tagInfoItem) => (
                <TagPart title={tagInfoItem.name} desc={tagInfoItem.desc} />
              ))}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Tags;
