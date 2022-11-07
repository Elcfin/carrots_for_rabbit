import "./index.scss";
import { TabPane, Tabs } from "@douyinfe/semi-ui";
import QuestionBar from "../../components/QuestionBar";
import { useEffect, useState } from "react";
import {
  getQuestionsByTag,
  QuestionListItemType,
} from "../../api/http/question/getQuestionsByTag";
import { useParams } from "react-router";
import { TagType } from "@douyinfe/semi-ui/lib/es/tag";
import { TAGNAMELIST, TagNameType } from "../../constants/info";

const Tag = () => {
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<TagNameType | null>(null);
  const [quesList, setQuesList] = useState<QuestionListItemType[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      setId(parseInt(params.id));
    }
  }, [params]);

  useEffect(() => {
    if (id) {
      const data = { tagId: id };
      getQuestionsByTag(data).then((resData) => {
        if (resData) {
          setQuesList(resData.questions ? resData.questions : []);
          setName(resData.name);
        }
      });
    } else {
      setQuesList([]);
    }
  }, [id]);

  return (
    <div className="tag">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane
          tab={`标签 "${!name || !TAGNAMELIST.includes(name) ? "" : name}"`}
          itemKey="tag"
        >
          <div className="tag-x">
            {!name || !TAGNAMELIST.includes(name)
              ? "该标签不存在"
              : quesList.length > 0
              ? quesList.map((ques) => (
                  <QuestionBar
                    isSolved={ques.hasAdopt}
                    content={ques.questionContent}
                    answerCount={ques.answerCount}
                    title={ques.questionTitle}
                    tagList={ques.tags ? ques.tags : []}
                    username={ques.userName}
                    timeStamp={ques.latestAnswerTime}
                    isRecommend={false}
                  />
                ))
              : "暂时空空如也呢......"}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Tag;
