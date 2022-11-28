import request from "../../request";

export type UploadfileDataReq = File;

type UploadfileDataRes = string;

export async function uploadImage(
  data: UploadfileDataReq
): Promise<UploadfileDataRes | null> {
  const res = await request<UploadfileDataRes>({
    url: `/uploadImage`,
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (data, headers) => {
      const formData = new FormData();
      /* console.log(data); */
      /* console.log(headers); */
      formData.set("image", data);
      /* console.log(formData.get("image")); */
      return formData;
    },
  });

  return res;
}
