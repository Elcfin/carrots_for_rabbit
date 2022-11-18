import "./index.scss";
import { Typography } from "@douyinfe/semi-ui";
import { Image } from "@douyinfe/semi-ui";
const MyFooter = () => {
  const { Text } = Typography;
  return (
    <div className="my_footer">
      <div>
        <a
          target="_blank"
          className="my_footer-a"
          href="https://beian.miit.gov.cn/?spm=a2c4g.11186623.0.0.58797cc8uNNvB2#/Integrated/recordQuery"
          rel="noreferrer"
        >
          <Text className="my_footer-a-text" style={{ color: "#939393" }}>
            苏ICP备2022041774号
          </Text>
        </a>
      </div>
      <div>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010402001399"
          className="my_footer-a"
          rel="noreferrer"
        >
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={require("../../assets/icon.png")} alt="备案图标" />
            <Text className="my_footer-a-text" style={{ color: "#939393" }}>
              苏公网安备 32010402001399号
            </Text>
          </div>
        </a>
      </div>
    </div>
  );
};
export default MyFooter;
