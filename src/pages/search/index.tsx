import { TabPane, Tabs } from "@douyinfe/semi-ui";
import QuestionBar from "../../components/QuestionBar";
import "./index.scss";

const Search = () => {
  const keyword = "keyword";
  return (
    <div className="search">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab={`${keyword} 的搜索结果`} itemKey="search">
          <div className="search-results">
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
      </Tabs>
    </div>
  );
};
export default Search;
