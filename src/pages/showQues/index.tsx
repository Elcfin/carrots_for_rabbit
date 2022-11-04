import "./index.scss";
import {
  Button,
  Input,
  SplitButtonGroup,
  TabPane,
  Tabs,
  TagGroup,
  TextArea,
  Upload,
  Typography,
  Avatar,
} from "@douyinfe/semi-ui";
import { useNavigate } from "react-router";
import {
  IconClose,
  IconCrossCircleStroked,
  IconCrossStroked,
  IconEyeOpened,
  IconPlus,
} from "@douyinfe/semi-icons";
import { useState } from "react";
import MyCarousel from "../../components/MyCarousel";
import { useScreen } from "../../hooks/useScreen";

const ShowQues = () => {
  const navigate = useNavigate();
  const title = "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。";
  const content =
    "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。\n闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。";
  const username = "root";
  const { Title, Paragraph, Text } = Typography;
  const { isMobile } = useScreen();
  return (
    <div className="show_ques">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane
          tab={`问题详情`}
          itemKey="search"
          style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
        >
          <div className="show_ques-x">
            <div className="show_ques-x-header">
              <Title heading={isMobile ? 6 : 5}>{title}</Title>
            </div>
            <div className="show_ques-x-tags">
              <Button
                size={"small"}
                disabled
                style={{
                  color: "var(--semi-color-carrot-dark)",
                  cursor: "default",
                }}
              >
                编译原理
              </Button>
              <Button
                size={"small"}
                disabled
                style={{
                  color: "var(--semi-color-carrot-dark)",
                  cursor: "default",
                }}
              >
                数据库
              </Button>
              <Button
                size={"small"}
                disabled
                style={{
                  color: "var(--semi-color-carrot-dark)",
                  cursor: "default",
                }}
              >
                数据库
              </Button>
            </div>
            <div className="show_ques-x-info">
              <div className="show_ques-x-info-user">
                <Avatar size="small" style={{ margin: 4 }} alt="User" />
                <Text link>{username}</Text>
              </div>
              <Text
                style={{ color: "var(--semi-color-text-2)" }}
              >{`发布时间：2022 年 10 月 22 日`}</Text>
            </div>
            <div className="show_ques-x-imgs">
              <MyCarousel
                imgList={[
                  "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png",
                  "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png",
                  "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png",
                ]}
              />
            </div>
            <div className="show_ques-x-content">
              <Paragraph spacing="extended">
                {content.split("\n").map((p) => (
                  <Paragraph>{p}</Paragraph>
                ))}
              </Paragraph>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShowQues;
