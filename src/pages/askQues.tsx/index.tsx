import "./index.scss";
import {
  Button,
  Dropdown,
  Input,
  SplitButtonGroup,
  TabPane,
  Tabs,
  TextArea,
  Upload,
} from "@douyinfe/semi-ui";
import { useNavigate } from "react-router";
import { IconClose, IconPlus, IconUpload } from "@douyinfe/semi-icons";
import { useState } from "react";
import { TAGNAMELIST, TagNameType } from "../../constants/info";
import { showToast } from "../../utils/showToast";
import MyCarousel from "../../components/MyCarousel";

const AskQues = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagNameType[]>([]);
  const [imgs, setImgs] = useState<string[]>([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png",
  ]);

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

  const handlePublish = () => {};

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
                  navigate("/home");
                }}
              >
                发布
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
                  onChange={(e) => {
                    // 获取到的当前文件实例，可以用于发送请求获得图片链接
                    const file = e.currentFile.fileInstance;
                    console.log(file);
                  }}
                >
                  <Button icon={<IconUpload />} theme="light">
                    点击上传图片
                  </Button>
                </Upload>
              </div>
              {imgs.length > 0 ? (
                <div className="ask_ques-x-imgs-list">
                  <MyCarousel imgList={imgs} />
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
