import "./index.scss";

import { IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";
import { Carousel, Button } from "@douyinfe/semi-ui";
import { useCallback, useEffect, useState } from "react";

interface MyCarouselPropsType {
  imgList: string[];
  setImgList?: React.Dispatch<React.SetStateAction<string[]>>;
}

const MyCarousel = (props: MyCarouselPropsType) => {
  const { imgList, setImgList } = props;
  const [activeIndex, setActiveIndex] = useState(imgList.length - 1);
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);
  useEffect(() => {
    forceUpdate();
  }, [imgList, forceUpdate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          theme="borderless"
          onClick={() => {
            const feature = "width=300,height=300";
            window.open(imgList[activeIndex], "imagePreview", feature);
          }}
          className="my_carousel-btn"
        >
          查看大图
        </Button>

        {setImgList ? (
          <Button
            theme="borderless"
            onClick={() => {
              setImgList((imgList) => [
                ...imgList.slice(0, activeIndex),
                ...imgList.slice(activeIndex + 1),
              ]);
            }}
            className="my_carousel-btn"
          >
            删除
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Carousel
        activeIndex={activeIndex}
        onChange={(index) => {
          setActiveIndex(index);
        }}
        style={{
          width: "100%",
          height: "400px",
          margin: "auto",
          backgroundColor: "var(--semi-color-bg-1)",
        }}
        theme="dark"
        className="my_carousel"
        autoPlay={false}
        arrowProps={{
          leftArrow: {
            children: (
              <Button
                theme="borderless"
                className="my_carousel-btn"
                icon={<IconChevronLeft size="large" />}
              />
            ),
          },
          rightArrow: {
            children: (
              <Button
                theme="borderless"
                className="my_carousel-btn"
                icon={<IconChevronRight size="large" />}
              />
            ),
          },
        }}
        indicatorSize="small"
      >
        {imgList.map((src, index) => {
          return (
            <div
              key={src}
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${src})`,
              }}
            ></div>
          );
        })}
      </Carousel>
      {imgList.length > 0 ? (
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {imgList.map((img, index) => (
            <div
              style={{
                backgroundColor:
                  index === activeIndex
                    ? "var(--semi-color-text-1)"
                    : "var(--semi-color-text-2)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => {
                setActiveIndex(index);
              }}
            ></div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyCarousel;
