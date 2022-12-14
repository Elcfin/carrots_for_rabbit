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
import { getIsLogin, getSelf } from "../../utils/getSelf";
import { showToast } from "../../utils/showToast";
import {
  getRecommendQuestions,
  QuestionItemType,
} from "../../api/http/user/getRecommendQuestions";
import { IconSync } from "@douyinfe/semi-icons";
import { useScreen } from "../../hooks/useScreen";

const Home = () => {
  const [activeTabKey, setActiveTabKey] = useState("new");
  const [isAsker, setIsAsker] = useState(false);
  const [quesList, setQuesList] = useState<QuestionListItemType[]>([]);
  const [recommendQuesList, setRecommendQuesList] = useState<
    QuestionItemType[]
  >([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const [updateFlag, setUpdateFlag] = useState(false);
  const { isMobile } = useScreen();
  const pageSize = 10;
  const isLogin = getIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    getLatestQuestions({ pageSize, num: curPage }).then((resData) => {
      if (resData) {
        setQuesList(resData.questions ? resData.questions : []);
        setTotalPage(resData.pageSum);
      }
    });
  }, [curPage, updateFlag, isAsker, isLogin]);

  useEffect(() => {
    if (activeTabKey !== "recommend") return;
    if (!isLogin) return;
    const { token } = getSelf();

    const data = { token: token!, prefer: isAsker };
    getRecommendQuestions(data).then((resData) => {
      if (resData) {
        setRecommendQuesList(resData.questions ? resData.questions : []);
      }
    });
  }, [updateFlag, isAsker, isLogin, activeTabKey]);

  const MyPagination = () => (
    <Pagination
      total={totalPage * pageSize}
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
                      ????????????????????????????????????
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
                {/* <Button
                  size={isMobile ? "small" : "default"}
                  onClick={() => {
                    setUpdateFlag((updateFlag) => !updateFlag);
                  }}
                  icon={<IconSync />}
                /> */}
              </>
            )}
            <Button
              theme="solid"
              size={isMobile ? "small" : "default"}
              onClick={() => {
                if (!isLogin) {
                  showToast("????????????????????????????????????", "info");
                  return;
                }
                navigate("/ask_ques");
              }}
            >
              ?????????
            </Button>
          </>
        }
      >
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane tab="??????" itemKey="new">
          <div className="home-new">
            {quesList.length > 0
              ? quesList.map((ques) => (
                  <QuestionBar
                    key={ques.questionID}
                    questionId={ques.questionID}
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
              : "?????????????????????......"}
            {totalPage > 1 ? (
              <div className="home-new-pagination">
                <MyPagination />
              </div>
            ) : (
              <></>
            )}
          </div>
        </TabPane>
        {/* ??????????????????????????????????????? */}
        {isLogin ? (
          <TabPane tab="????????????" itemKey="recommend">
            <div className="home-recommend">
              {recommendQuesList.length > 0
                ? recommendQuesList.map((ques) => (
                    <QuestionBar
                      key={ques.questionID}
                      questionId={ques.questionID}
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
                : "?????????????????????......"}
            </div>
          </TabPane>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
};
export default Home;
