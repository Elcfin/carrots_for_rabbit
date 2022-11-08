import "./index.scss";
import {
  Button,
  Dropdown,
  ImagePreview,
  Input,
  SplitButtonGroup,
  TabPane,
  Tabs,
  TextArea,
  Upload,
  Image,
} from "@douyinfe/semi-ui";
import { useNavigate, useParams } from "react-router";
import { IconClose, IconPlus, IconUpload } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import { TAGNAMELIST, TagNameType } from "../../constants/info";
import { showToast } from "../../utils/showToast";
import MyCarousel from "../../components/MyCarousel";
import {
  insertNewQuestion,
  InsertNewQuestionDataReq,
} from "../../api/http/question/insertNewQuestion";
import { getSelf, removeSelf } from "../../utils/getSelf";
import { getConciseQuestionByQuestionId } from "../../api/http/question/getConciseQuestionByQuestionId";
import {
  updateQuestion,
  UpdateQuestionDataReq,
} from "../../api/http/question/updateQuestion";
import { uploadImage } from "../../api/http/img/uploadImage";

const AskQues = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(-1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagNameType[]>([]);
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    console.log("imgs", imgs);
  }, [imgs]);

  useEffect(() => {
    const { token } = getSelf();
    if (!token) {
      showToast("身份信息失效，请重新登录", "info");
      removeSelf();
      return;
    }
    if (params.id) {
      setIsUpdate(true);
      setId(parseInt(params.id));
      const data = {
        token,
        questionId: parseInt(params.id),
      };
      getConciseQuestionByQuestionId(data).then((resData) => {
        if (resData) {
          setTitle(resData.title);
          setContent(resData.content);
          setSelectedTags(resData.tags ? resData.tags : []);
          setImgs(resData.questionImages ? resData.questionImages : []);
        } else {
          setIsUpdate(false);
        }
      });
    }
  }, [params]);

  const handleAddTagBtnClick = (tagName: TagNameType) => {
    /* if (selectedTags.length >= 3) {
      showToast("最多添加三个标签", "info");
      return;
    } */
    if (selectedTags.includes(tagName)) {
      showToast("该标签已添加", "info");
    } else {
      setSelectedTags((selectedTags) => [...selectedTags, tagName]);
    }
  };

  const handleDeleteTagClick = (tagName: TagNameType) => {
    setSelectedTags((selectedTags) =>
      selectedTags.filter((selectedTag) => selectedTag !== tagName)
    );
  };

  const handlePublish = async () => {
    const { token } = getSelf();
    if (!token) {
      showToast("身份信息失效，请重新登录", "info");
      removeSelf();
      return;
    }
    if (!title) {
      showToast("标题不能为空", "info");
      return;
    }
    if (selectedTags.length > 3) {
      showToast("最多添加三个标签", "info");
      return;
    }
    if (!content) {
      showToast("内容不能为空", "info");
      return;
    }
    if (!isUpdate) {
      // 如果是发布问题
      const data: InsertNewQuestionDataReq = {
        token,
        title,
        content,
        imageURLs: imgs,
        tags: selectedTags,
      };
      const resData = await insertNewQuestion(data);
      if (resData) {
        showToast("问题发布成功", "info");
        navigate("/home");
      }
    } else {
      // 如果是更新问题
      const data: UpdateQuestionDataReq = {
        token,
        questionId: id,
        title,
        content,
        imageURLs: imgs,
        tags: selectedTags,
      };
      const resData = await updateQuestion(data);
      if (resData) {
        showToast("问题更新成功", "info");
        navigate(`/show_ques/${id}`);
      }
    }
  };

  return (
    <div className="ask_ques">
      <Tabs type="line">
        <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
        <TabPane
          tab={`提问题`}
          itemKey="search"
          style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
        >
          <div className="ask_ques-x">
            <div className="ask_ques-x-header">
              <Input
                size="large"
                value={title}
                placeholder="输入问题标题"
                onChange={(v) => {
                  setTitle(v);
                }}
              />
              <Button
                theme="solid"
                onClick={() => {
                  handlePublish();
                }}
              >
                {isUpdate ? "更新" : "发布"}
              </Button>
            </div>
            <div className="ask_ques-x-tags">
              {selectedTags.map((tagName) => (
                <SplitButtonGroup>
                  <Button
                    disabled
                    style={{
                      color: "var(--semi-color-carrot-dark)",
                      cursor: "default",
                    }}
                    key="tagName"
                  >
                    {tagName}
                  </Button>
                  <Button
                    icon={<IconClose size={"small"} />}
                    onClick={() => {
                      handleDeleteTagClick(tagName);
                    }}
                  />
                </SplitButtonGroup>
              ))}
              {selectedTags.length >= 3 ? (
                <Button disabled={true}>最多添加三个标签</Button>
              ) : (
                <Dropdown
                  position={"bottom"}
                  clickToHide={true}
                  render={
                    <Dropdown.Menu>
                      {TAGNAMELIST.map((tagName) => (
                        <Dropdown.Item
                          key={tagName}
                          onClick={() => {
                            handleAddTagBtnClick(tagName);
                          }}
                        >
                          {tagName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  }
                >
                  <Button
                    icon={<IconPlus size={"small"} />}
                    iconPosition="right"
                  >
                    添加标签
                  </Button>
                </Dropdown>
              )}
            </div>
            <div className="ask_ques-x-content">
              <TextArea
                autosize
                placeholder="输入对问题的详细描述"
                value={content}
                onChange={(v) => {
                  setContent(v);
                }}
              />
            </div>
            <div className="ask_ques-x-imgs">
              <div className="ask_ques-x-imgs-upload">
                <Upload
                  fileList={[]}
                  accept={"image/*"}
                  onChange={async (e) => {
                    // 获取到的当前文件实例，可以用于发送请求获得图片链接
                    const file = e.currentFile.fileInstance;
                    if (file) {
                      const data = file;
                      const resData = await uploadImage(data);

                      if (resData) {
                        setImgs((imgs) => [...imgs, resData]);
                      }
                    }
                  }}
                  beforeClear={(v) => {
                    console.log(v);
                    return true;
                  }}
                >
                  <Button icon={<IconUpload />} theme="light">
                    点击上传图片
                  </Button>
                </Upload>
              </div>
              {imgs.length > 0 && imgs.length % 2 ? (
                <div className="ask_ques-x-imgs-list">
                  <MyCarousel imgList={imgs} setImgList={setImgs} />
                </div>
              ) : (
                <></>
              )}
              {imgs.length > 0 && !(imgs.length % 2) ? (
                <div className="ask_ques-x-imgs-list">
                  <MyCarousel imgList={imgs} setImgList={setImgs} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AskQues;
