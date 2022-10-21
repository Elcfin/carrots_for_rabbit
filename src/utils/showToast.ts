import { Toast } from "@douyinfe/semi-ui";
import { ToastReactProps } from "@douyinfe/semi-ui/lib/es/toast";

/**
 * 展示一个 toast 弹窗
 * @param content toast 中的内容
 * @param type toast 的颜色
 * @param opt 其他选项, 见 ToastReactProps 类型
 * @returns 提前关闭这个 toast 的函数
 */
export const showToast = (
  content: string,
  type: "success" | "info" | "error" | "warning",
  opt: Omit<ToastReactProps, "type" | "content"> = {}
) => {
  const id = Toast[type]({ ...opt, content });
  return () => {
    Toast.close(id);
  };
};
