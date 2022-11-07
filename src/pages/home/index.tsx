import "./index.scss";

import {
  Tabs,
  TabPane,
  Button,
  Switch,
  Tooltip,
  Pagination,
} from "@douyinfe/semi-ui";
import QuestionBar from "../../components/QuestionBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  getLatestQuestions,
  QuestionListItemType,
} from "../../api/http/question/getLatestQuestions";

const useHome = () => {
  const [activeTabKey, setActiveTabKey] = useState("new");
  const [isAsker, setIsAsker] = useState(false);
  const [quesList, setQuesList] = useState<QuestionListItemType[]>([]);
  const [recommendQuesList, setRecommendQuesList] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const pageSize = 10;
  useEffect(() => {
    getLatestQuestions({ pageSize, num: curPage }).then((resData) => {
      if (resData) {
        setQuesList(resData.questions ? resData.questions : []);
      }
    });
  }, [curPage]);
  return {
    activeTabKey,
    setActiveTabKey,
    isAsker,
    setIsAsker,
    quesList,
    totalPage,
    pageSize,
    setCurPage,
    curPage,
    recommendQuesList,
  };
};

const Home = () => {
  const {
    activeTabKey,
    setActiveTabKey,
    isAsker,
    setIsAsker,
    quesList,
    totalPage,
    pageSize,
    setCurPage,
    curPage,
    recommendQuesList,
  } = useHome();
  const navigate = useNavigate();

  const MyPagination = () => (
    <Pagination
      total={totalPage * pageSize}
      showTotal
      style={{ marginBottom: 12 }}
      currentPage={curPage}
      onPageChange={(v) => {
        setCurPage(v);
      }}
    />
  );

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
            {quesList.length > 0
              ? quesList.map((ques) => (
                  <QuestionBar
                    isSolved={ques.hasAdopt}
                    content={ques.questionContent}
                    answerCount={ques.answerCount}
                    title={ques.questionTitle}
                    tagList={ques.tags ? ques.tags : []}
                    username={ques.userName}
                    timeStamp={
                      ques.latestAnswerTime > ques.questionTime
                        ? ques.latestAnswerTime
                        : ques.questionTime
                    }
                    isRecommend={false}
                  />
                ))
              : "暂时空空如也呢......"}
            {totalPage > 1 ? (
              <div className="home-new-pagination">
                <MyPagination />
              </div>
            ) : (
              <></>
            )}
          </div>
        </TabPane>
        <TabPane tab="为我推送" itemKey="recommend">
          <div className="home-recommend">
            {recommendQuesList.length > 0
              ? recommendQuesList.map((ques) => (
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
export default Home;
