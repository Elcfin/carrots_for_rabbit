import "./index.scss";
import { Pagination, TabPane, Tabs } from "@douyinfe/semi-ui";
import QuestionBar from "../../components/QuestionBar";
import { useEffect, useState } from "react";
import {
  getQuestionsByTag,
  GetQuestionsByTagDataReq,
  QuestionListItemType,
} from "../../api/http/question/getQuestionsByTag";
import { useNavigate, useParams } from "react-router";
import { TAGNAMELIST, TagNameType } from "../../constants/info";
import { showToast } from "../../utils/showToast";

const Tag = () => {
  const [name, setName] = useState<TagNameType | null>(null);
  const [quesList, setQuesList] = useState<QuestionListItemType[]>([]);
  const params = useParams();
  const navigate = useNavigate();

  const [totalPage, setTotalPage] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    if (params.name) {
      if (TAGNAMELIST.find((tagName) => tagName === params.name))
        setName(params.name as TagNameType);
      else {
        showToast("该标签不存在", "info");
        navigate(`/tags`);
      }
    }
  }, [params]);

  useEffect(() => {
    if (name) {
      const data: GetQuestionsByTagDataReq = {
        tagName: name,
        pageSize,
        num: curPage,
      };
      getQuestionsByTag(data).then((resData) => {
        if (resData) {
          setQuesList(resData.questions ? resData.questions : []);
          setTotalPage(resData.pageSum);
        }
      });
    } else {
      setQuesList([]);
    }
  }, [name, curPage]);

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
              : "暂时空空如也呢......"}
            {totalPage > 1 ? (
              <div className="tag-x-pagination">
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
export default Tag;
