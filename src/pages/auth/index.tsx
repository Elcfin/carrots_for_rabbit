import "./index.scss";
import { Tabs, TabPane } from "@douyinfe/semi-ui";

const Auth = () => (
  <div className="auth">
    <div className="auth-x">
      <div className="auth-x-nav">
        <Tabs type="button">
          <TabPane tab="登录" itemKey="1">
            登录
          </TabPane>
          <TabPane tab="注册" itemKey="2">
            注册
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
);
export default Auth;
