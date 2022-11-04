import "./index.scss";

import { IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";
import { Carousel, Button } from "@douyinfe/semi-ui";

interface MyCarouselPropsType {
  imgList: string[];
}

const MyCarousel = (props: MyCarouselPropsType) => {
  const { imgList } = props;

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
