import "./index.scss";
import {
  Button,
  Input,
  SplitButtonGroup,
  TabPane,
  Tabs,
  TagGroup,
  TextArea,
  Upload,
} from "@douyinfe/semi-ui";
import { useNavigate } from "react-router";
import {
  IconClose,
  IconCrossCircleStroked,
  IconCrossStroked,
  IconEyeOpened,
  IconPlus,
} from "@douyinfe/semi-icons";
import { useState } from "react";

const AskQues = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
              <SplitButtonGroup>
                <Button
                  disabled
                  style={{
                    color: "var(--semi-color-carrot-dark)",
                    cursor: "default",
                  }}
                >
                  编译原理
                </Button>
                <Button icon={<IconClose size={"small"} />} />
              </SplitButtonGroup>
              <SplitButtonGroup>
                <Button
                  disabled
                  style={{
                    color: "var(--semi-color-carrot-dark)",
                    cursor: "default",
                  }}
                >
                  数据库
                </Button>
                <Button icon={<IconClose size={"small"} />} />
              </SplitButtonGroup>
              <SplitButtonGroup>
                <Button
                  disabled
                  style={{
                    color: "var(--semi-color-carrot-dark)",
                    cursor: "default",
                  }}
                >
                  数据库
                </Button>
                <Button icon={<IconClose size={"small"} />} />
              </SplitButtonGroup>
              <Button icon={<IconPlus size={"small"} />} iconPosition="right">
                添加标签
              </Button>
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
            <div className="ask_ques-x-imgs"></div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AskQues;
