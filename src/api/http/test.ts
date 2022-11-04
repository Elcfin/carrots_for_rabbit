import request from "../request";

// 珍贵的上传图片请求 no 删除
export async function uploadFile(data: File): Promise<any> {
  const res = await request<any>({
    url: `/uploadfile`,
    method: "Post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (data, headers) => {
      const formData = new FormData();
      console.log(data);
      console.log(headers);
      formData.set("f1", data);
      console.log(formData.get("f1"));
      return formData;
    },
  });

  return res;
}
