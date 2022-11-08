import { Pagination, TabPane, Tabs } from "@douyinfe/semi-ui";
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

  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const pageSize = 10;

  const MyPagination = () => (
    <Pagination
      total={totalPage * pageSize}
      style={{ margin: "auto", marginBottom: 12 }}
      currentPage={curPage}
      onPageChange={(v) => {
        setCurPage(v);
      }}
    />
  );

  useEffect(() => {
    if (params.keyword) {
      setKeyword(params.keyword);
    }
  }, [params]);

  useEffect(() => {
    if (keyword) {
      const data = { searchString: keyword, pageSize, num: curPage };
      getSearchedQuestions(data).then((resData) => {
        if (resData) {
          setQuesList(resData.questions ? resData.questions : []);
          setTotalPage(resData.pageSum);
        }
      });
    } else {
      setQuesList([]);
    }
  }, [keyword, curPage]);

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
                    questionId={ques.questionID}
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
            {totalPage > 1 ? (
              <div className="search-results-pagination">
                <MyPagination />
              </div>
            ) : (
              <></>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Search;
