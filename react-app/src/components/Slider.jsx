import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Slider() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      slidesPerView={2}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      style={{ height: "388px" }}
    >
      <SwiperSlide>
        <img
          src="Images/10.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="Images/7.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="Images/8.png"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="Images/9.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
