import { IconSearch, IconSearchStroked, IconUser } from "@douyinfe/semi-icons";
import {
  Button,
  Input,
  InputGroup,
  Modal,
  Nav,
  Space,
} from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useScreen } from "../../hooks/useScreen";

import "./index.scss";

const MyNav = () => {
  const { isMobile } = useScreen();
  const [content, setContent] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const key =
      location.pathname === "/home"
        ? "home"
        : location.pathname === "/tags"
        ? "tags"
        : "";
    setSelectedKeys(() => [key]);
  }, [location]);

  useEffect(() => {
    setIsModalShow((isModalShow) => (!isMobile ? false : isModalShow));
  }, [isMobile]);
  return (
    <>
      <div className="x"></div>
      <div className="nav">
        <div className="nav-wrap">
          <Nav
            mode={"horizontal"}
            items={[
              { itemKey: "home", text: "问答" },
              { itemKey: "tags", text: "分类" },
            ]}
            selectedKeys={selectedKeys}
            onSelect={(key) => {
              navigate(`${key.itemKey}`);
              /* setSelectedKeys(() => [key.itemKey as string]); */
            }}
            header={{
              logo: (
                <img
                  src="http://post-image.oss-cn-hangzhou.aliyuncs.com/img/herbarium.png"
                  alt="logo"
                />
              ),
              children: (
                <span style={{ fontFamily: "ZYFangHuaTi", fontSize: 28 }}>
                  {isMobile ? "" : "小白兔的萝卜基地"}
                </span>
              ),
            }}
            footer={
              <>
                {isMobile ? (
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setIsModalShow(true);
                    }}
                    icon={
                      <IconSearch
                        style={{
                          color: "var(--semi-color-text-2)",
                        }}
                      />
                    }
                  />
                ) : (
                  <Input
                    value={content}
                    style={{ marginRight: 10 }}
                    onChange={(v) => {
                      setContent(v);
                    }}
                    onEnterPress={() => {
                      navigate("search");
                      setContent("");
                    }}
                    suffix={
                      <IconSearch
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("search");
                          setContent("");
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
        <Modal
          visible={isModalShow}
          header={null}
          onOk={() => {
            navigate("search");
            setIsModalShow(false);
            setContent("");
          }}
          onCancel={() => {
            setIsModalShow(false);
            setContent("");
          }}
          okText={"搜索"}
          cancelText={"取消"}
          style={{ width: "360px" }}
        >
          <Input
            style={{ marginTop: "24px" }}
            value={content}
            onChange={(v) => {
              setContent(v);
            }}
          />
        </Modal>
        {/*      {isMobile && (
          <div className="nav-btn-float">
            <Button
              icon={
                <IconSearch
                  size="large"
                  style={{ color: "var(--primary-d)" }}
                />
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
        )} */}
      </div>
    </>
  );
};
export default MyNav;
