import "./index.scss";
import { Tabs, TabPane } from "@douyinfe/semi-ui";

import LoginPart from "./components/LoginPart";
import RegisterPart from "./components/RegisterPart";

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-x">
        <Tabs type="line" style={{ width: 360 }}>
          <TabPane tab="" itemKey="_" disabled style={{ cursor: "default" }} />
          <TabPane
            tab="登录"
            itemKey="login"
            style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 1px" }}
          >
            <LoginPart />
          </TabPane>
          <TabPane tab="注册" itemKey="register">
            <RegisterPart />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
