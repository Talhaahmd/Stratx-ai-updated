"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import {
  addEvents,
  slideNextTransitionStart,
  slidePrevTransitionStart,
  verTextFragment,
} from "@/utils/webgl-anim";
import { WebGL } from "@/plugins";
import { supabase } from "@/utils/supabaseClient";

type Slide = {
  id: number;
  order_index: number;
  subtitle: string | null;
  title: string;
  image_url: string;
  slug?: string | null;
  link_url?: string | null;
};

export default function PortfolioSliderHomeEleven() {
  const webGLContainerRef = useRef<HTMLDivElement>(null);
  const webGLInstanceRef = useRef<any>(null); // keep WebGL instance so we don't init twice
  const [slides, setSlides] = useState<Slide[]>([]);

  // Fetch slides from Supabase (same backend as Home-10)
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("portfolio_slides")
        .select("id, order_index, subtitle, title, image_url, slug, link_url")
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Error fetching portfolio slides:", error.message);
        return;
      }

      setSlides((data || []) as Slide[]);
    };

    fetchSlides();
  }, []);

  // Initialise WebGL ONLY after slides (and their <img> tags) exist
  useEffect(() => {
    if (!webGLContainerRef.current) return;
    if (!slides.length) return; // wait for Supabase data
    if (webGLInstanceRef.current) return; // already initialised

    const webGL = new WebGL({
      vertex: verTextFragment().vertex,
      fragment: verTextFragment().fragment,
    });

    webGLInstanceRef.current = webGL;

    addEvents(webGL);
    webGLContainerRef.current.appendChild(webGL.renderer.domElement);

    return () => {
      webGL.stop();
      webGLInstanceRef.current = null;
    };
  }, [slides]);

  if (!slides.length) {
    // you can return a loader here if you want
    return null;
  }

  const getSlideLink = (item: Slide) =>
    item.slug
      ? `/portfolio-showcase-details/${item.slug}`
      : item.link_url || "/portfolio-showcase-details";

  return (
    <div id="port-showcase-slider-main">
      <div className="port-showcase-slider-spaces p-relative">
        <div
          className="port-showcase-slider-wrap tp-slider-parallax fix"
          id="showcase-slider-holder"
          data-pattern-img="/assets/img/webgl/1.jpg"
        >
          <div
            className="swiper-container parallax-slider-active p-relative"
            id="showcase-slider"
          >
            <Swiper
              direction="horizontal"
              slidesPerView="auto"
              touchStartPreventDefault={false}
              speed={1000}
              effect="fade"
              loop={true}
              mousewheel={true}
              simulateTouch={true}
              navigation={{
                nextEl: ".swiper-next",
                prevEl: ".swiper-prev",
              }}
              pagination={{
                el: ".tp-slider-dot",
                clickable: true,
              }}
              modules={[Navigation, Pagination, Autoplay, Mousewheel]}
              onSlidePrevTransitionStart={slidePrevTransitionStart}
              onSlideNextTransitionStart={slideNextTransitionStart}
              id="trigger-slides"
            >
              {slides.map((item, i) => (
                <SwiperSlide key={item.id}>
                  <div
                    className={`slide-wrap ${i === 0 ? "active" : ""}`}
                    data-slide={i}
                  ></div>
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="port-showcase-slider-item">
                          <div className="port-showcase-slider-content">
                            {item.subtitle && (
                              <span className="port-showcase-slider-subtitle">
                                {item.subtitle}
                              </span>
                            )}
                            <h4 className="port-showcase-slider-title">
                              <Link
                                href={getSlideLink(item)}
                                dangerouslySetInnerHTML={{ __html: item.title }}
                              />
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="tp-showcase-arrow-box">
              <button className="tp-showcase__button-next swiper-next">
                <i className="fa-light fa-angle-up"></i>
              </button>
              <button className="tp-showcase__button-prev swiper-prev">
                <i className="fa-light fa-angle-down"></i>
              </button>
            </div>
            <div className="tp-slider-dot d-none d-md-block"></div>
            <div className="port-showcase-slider-social tp-hover-btn-wrapper d-none d-md-block">
              <Link className="tp-hover-btn-item" href="#">
                Fb
              </Link>
              <Link className="tp-hover-btn-item" href="#">
                In
              </Link>
              <Link className="tp-hover-btn-item" href="#">
                Be
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* canvas slider – images used as textures by WebGL */}
      <div id="canvas-slider" className="canvas-slider" ref={webGLContainerRef}>
        {slides.map((slide, index) => (
          <div key={slide.id} className="slider-img" data-slide={index}>
            <Image
              className="slide-img"
              src={slide.image_url}
              alt={slide.subtitle || "showcase-img"}
              width={1600}
              height={900}
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
