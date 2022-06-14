import { useRef } from 'react';
import Swiper, { type SwipeRef } from 'react-tiga-swiper';
import 'react-tiga-swiper/dist/index.css';

const Demo = () => {
  const swiperRef = useRef<SwipeRef>(null);

  const prev = () => {
    const swiperInstance = swiperRef.current;
    swiperInstance?.prev();
  };

  const next = () => {
    const swiperInstance = swiperRef.current;
    swiperInstance?.next();
  };

  const onChange = (currPage: number, prevPage: number) => {
    console.log(currPage, prevPage);
  };

  return (
    <div className="space-y-8">
      <div className="space-x-2">
        <span className="btn" onClick={prev}>
          上一页
        </span>
        <span className="btn" onClick={next}>
          下一页
        </span>
      </div>
      <Swiper
        className="h-[648px]"
        autoPlay={3000}
        selectedIndex={0}
        showIndicators={true}
        indicator={null}
        dots={null}
        direction="horizontal"
        loop={true}
        ref={swiperRef}
        onChange={onChange}
      >
        <div className="bg-cover bg-img-1" />
        <div className="bg-cover bg-img-2" />
        <div className="bg-cover bg-img-3" />
        <div className="bg-cover bg-img-4" />
        <div className="bg-cover bg-img-5" />
        <div className="bg-cover bg-img-6" />
        <div className="bg-cover bg-img-7" />
        <div className="bg-cover bg-img-8" />
        <div className="bg-cover bg-img-9" />
        <div className="bg-cover bg-img-10" />
      </Swiper>
    </div>
  );
};

export default Demo;
