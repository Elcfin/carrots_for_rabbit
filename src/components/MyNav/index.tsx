import { IconSearch } from "@douyinfe/semi-icons";
import { Button, Input, Modal, Nav } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useScreen } from "../../hooks/useScreen";
import { getIsLogin } from "../../utils/getSelf";
import { showToast } from "../../utils/showToast";

import "./index.scss";

const MyNav = () => {
  const { isMobile } = useScreen();
  const [content, setContent] = useState("");
  const [isModalShow, setIsModalShow] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = getIsLogin();

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

  const handleSearch = () => {
    if (!content) {
      showToast("搜索关键词为空", "info");
      return;
    }
    navigate(`search/${content}`);
    setContent("");
  };

  const handleModalSearch = () => {
    if (!content) {
      showToast("搜索关键词为空", "info");
      return;
    }
    navigate(`search/${content}`);
    setContent("");
    setIsModalShow(false);
  };

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
                      handleSearch();
                    }}
                    suffix={
                      <IconSearch
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleSearch();
                        }}
                      />
                    }
                  />
                )}

                <Button
                  style={{
                    marginRight: 10,
                    color:
                      location.pathname === "/about" ||
                      location.pathname === "/auth"
                        ? "var(--semi-color-text-0)"
                        : "var(--semi-color-text-2)",
                  }}
                  onClick={() => {
                    navigate(isLogin ? "about" : "auth");
                  }}
                >
                  {isLogin ? "关于我" : "登录/注册"}
                </Button>
              </>
            }
          />
        </div>
        <Modal
          visible={isModalShow}
          header={null}
          onOk={() => {
            handleModalSearch();
          }}
          onCancel={() => {
            setContent("");
            setIsModalShow(false);
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
      </div>
    </>
  );
};
export default MyNav;
