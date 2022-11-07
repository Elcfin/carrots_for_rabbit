import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getSearchedQuestions,
  QuestionListItemType,
} from "../../api/http/question/getSearchedQuestions";
import QuestionBar from "../../components/QuestionBar";
import "./index.scss";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [quesList, setQuesList] = useState<QuestionListItemType[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.keyword) {
      setKeyword(params.keyword);
    }
  }, [params]);

  useEffect(() => {
    if (keyword) {
      const data = { searchString: keyword };
      getSearchedQuestions(data).then((resData) => {
        if (resData) {
          setQuesList(resData.questions ? resData.questions : []);
        }
      });
    } else {
      setQuesList([]);
    }
  }, [keyword]);

  return (
    <div className="search">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab={`"${keyword}" 的搜索结果`} itemKey="search">
          <div className="search-results">
            {!keyword
              ? "搜索关键词为空"
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
export default Search;
