import "./index.scss";

import { TabPane, Tabs } from "@douyinfe/semi-ui";
import TagPart from "./components/TagPart";

const Tags = () => {
  return (
    <div className="tags">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab={`标签`} itemKey="tag">
          <div className="tags-x">
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
            <TagPart
              title="title"
              desc={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。"
              }
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Tags;
