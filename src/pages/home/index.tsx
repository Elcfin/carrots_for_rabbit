import "./index.scss";

import {
  Image,
  Tabs,
  TabPane,
  Button,
  Switch,
  Divider,
  Popover,
  Tooltip,
} from "@douyinfe/semi-ui";
import QuestionBar from "../../components/QuestionBar";
import { useState } from "react";
import { IconHelpCircle } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router";

const useHome = () => {
  const [activeTabKey, setActiveTabKey] = useState("new");
  const [isAsker, setIsAsker] = useState(false);
  return { activeTabKey, setActiveTabKey, isAsker, setIsAsker };
};

const Home = () => {
  const { activeTabKey, setActiveTabKey, isAsker, setIsAsker } = useHome();
  const navigate = useNavigate();
  return (
    <div className="home">
      <Tabs
        type="line"
        activeKey={activeTabKey}
        onChange={(v) => {
          setActiveTabKey(v);
        }}
        tabBarExtraContent={
          <>
            {activeTabKey === "recommend" && (
              <>
                <Tooltip
                  position="left"
                  content={
                    <article style={{ padding: 12 }}>
                      更倾向于在本网站提出问题
                    </article>
                  }
                >
                  <Switch
                    checked={isAsker}
                    onChange={(v, e) => {
                      setIsAsker(v);
                    }}
                  />
                </Tooltip>
              </>
            )}
            <Button
              theme="solid"
              onClick={() => {
                navigate("/ask_ques");
              }}
            >
              提问题
            </Button>
          </>
        }
      >
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab="最新" itemKey="new">
          <div className="home-new">
            <QuestionBar
              isSolved={true}
              content={
                "天地玄黄，宇宙洪荒。\n日月盈昃，辰宿列张。寒来暑往，秋收冬藏。\n闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。"
              }
              answerCount={2}
              title={"我与父亲不相见已二年余了，我最不能忘记的是他的背影"}
              tagList={["机器学习", "汇编语言", "编译原理"]}
              username={"小豆泥爱喝酒"}
              timeStamp={1666357592926}
              isRecommend={false}
            />
            <QuestionBar
              isSolved={false}
              content={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。"
              }
              answerCount={2}
              title={"龙龙嘿嘿嘿嘿龙宝"}
              tagList={["机器学习", "汇编语言", "编译原理"]}
              username={"root"}
              timeStamp={1666357592926}
              isRecommend={false}
            />
            <QuestionBar
              isSolved={false}
              content={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。"
              }
              answerCount={2}
              title={"在你与我初见的那天晚上，就像是把猫猫堆成塔"}
              tagList={["机器学习", "汇编语言", "编译原理"]}
              username={"root"}
              timeStamp={1666357592926}
              isRecommend={false}
            />

            <QuestionBar
              isSolved={false}
              content={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。"
              }
              answerCount={2}
              title={"在你与我初见的那天晚上，就像是把猫猫堆成塔"}
              tagList={["机器学习", "汇编语言", "编译原理"]}
              username={"root"}
              timeStamp={1666357592926}
              isRecommend={false}
            />
          </div>
        </TabPane>
        <TabPane tab="为我推送" itemKey="recommend">
          <div className="home-recommend">
            <QuestionBar
              isSolved={true}
              content={
                "天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。寒来暑往，秋收冬藏。闰余成岁，律吕调阳。云腾致雨，露结为霜。金生丽水，玉出昆冈。剑号巨阙，珠称夜光。果珍李柰，菜重芥姜。"
              }
              answerCount={2}
              title={"在你与我初见的那天晚上，就像是把猫猫堆成塔"}
              tagList={["机器学习", "汇编语言", "编译原理"]}
              username={"小豆泥爱喝酒"}
              timeStamp={1666357592926}
              isRecommend={true}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Home;
