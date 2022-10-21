import { IconSearch, IconUser } from "@douyinfe/semi-icons";
import { Button, Input, InputGroup, Nav, Space } from "@douyinfe/semi-ui";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useScreen } from "../../hooks/useScreen";

import "./index.scss";

const MyNav = () => {
  const { isMobile } = useScreen();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="nav-wrap">
        <Nav
          mode={"horizontal"}
          items={[
            { itemKey: "home", text: "问答" },
            { itemKey: "tag", text: "分类" },
          ]}
          onSelect={(key) => {
            console.log(key);
            navigate(`${key.itemKey}`);
          }}
          header={{
            logo: (
              <img
                src="http://post-image.oss-cn-hangzhou.aliyuncs.com/img/herbarium.png"
                alt="logo"
              />
            ),
            text: isMobile ? "" : "标题",
          }}
          footer={
            <>
              {isMobile ? (
                <></>
              ) : (
                <Input
                  value={content}
                  style={{ marginRight: 10 }}
                  onChange={(v) => {
                    setContent(v);
                  }}
                  onEnterPress={() => {
                    navigate("search");
                  }}
                  suffix={
                    <IconSearch
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("search");
                      }}
                    />
                  }
                />
              )}

              <Button
                style={{
                  marginRight: 10,
                  color: "var(--on-bg-l)",
                }}
                onClick={() => {
                  navigate("auth");
                }}
              >
                登录/注册
              </Button>
            </>
          }
        />
      </div>
      {isMobile && (
        <div className="nav-btn-float">
          <Button
            icon={
              <IconSearch size="large" style={{ color: "var(--primary-d)" }} />
            }
            style={{
              backgroundColor: "var(--semi-color-nav-bg)",
              borderRadius: "50%",
              height: "45px",
              width: "45px",
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px",
            }}
            theme="light"
            onClick={() => {
              navigate("search");
            }}
          />
        </div>
      )}
    </div>
  );
};
export default MyNav;
