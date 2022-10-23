import "./index.scss";

import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconSmallTriangleRight,
} from "@douyinfe/semi-icons";
import { Carousel, Typography, Space, Button } from "@douyinfe/semi-ui";

const MyCarousel = () => {
  const { Title, Paragraph } = Typography;

  const colorStyle = {
    color: "#1C1F23",
  };

  const imgList = [
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png",
  ];

  return (
    <Carousel
      style={{
        width: "100%",
        height: "400px",
        margin: "auto",
        backgroundColor: "var(--semi-color-bg-1)",
      }}
      className="my_carousel"
      theme="dark"
      autoPlay={false}
      arrowProps={{
        leftArrow: {
          children: <Button icon={<IconChevronLeft size="large" />}></Button>,
        },
        rightArrow: {
          children: <Button icon={<IconChevronRight size="large" />}></Button>,
        },
      }}
      indicatorSize="small"
    >
      {imgList.map((src, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${src})`,
            }}
          >
            <Button
              theme="borderless"
              onClick={() => {
                const feature = "width=300,height=300";
                window.open(src, "imagePreview", feature);
              }}
            >
              查看大图
            </Button>
          </div>
        );
      })}
    </Carousel>
  );
};

export default MyCarousel;
