"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import { DownArrow } from "../../svg";
import { SlickNextArrow, SlickPrevArrow } from "../../slick-arrow";
import { supabase } from "@/utils/supabaseClient";

// Type that matches your DB schema (only the fields we need here)
type Slide = {
  id: number;
  order_index: number;
  subtitle: string | null;
  title: string;
  image_url: string; // thumbnail / card image
  hero_bg_url: string | null; // big hero bg (optional)
  slug: string | null;
  link_url: string | null;
};

// Slider settings
const slider_setting_one = {
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  speed: 1000,
  nextArrow: <SlickNextArrow />,
  prevArrow: <SlickPrevArrow />,
};

const slider_setting_two = {
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  focusOnSelect: true,
  centerPadding: "0",
  speed: 600,
  nextArrow: <SlickNextArrow />,
  prevArrow: <SlickPrevArrow />,
};

const TypedSlider = Slider as React.ComponentType<any>;

export default function PortfolioSliderHomeTen() {
  const [slider1, setSlider1] = useState<any>(null);
  const [slider2, setSlider2] = useState<any>(null);
  const [sliderIndex, setSliderIndex] = useState<number>(1);
  const [sliderData, setSliderData] = useState<Slide[]>([]);

  // Fetch Supabase data
  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase
        .from("portfolio_slides")
        .select(
          "id, order_index, subtitle, title, image_url, hero_bg_url, slug, link_url"
        )
        .order("order_index", { ascending: true });

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      setSliderData((data || []) as Slide[]);
    };

    fetchSlides();
  }, []);

  if (!sliderData.length) return null;

  // Primary link:
  // 1) if slug exists: go to dynamic details page
  // 2) else if link_url exists: use that
  // 3) else: stay on page
  const getSlideLink = (item: Slide) => {
    if (item.slug && item.slug.trim().length > 0) {
      return `/portfolio-showcase-details/${item.slug}`;
    }
    if (item.link_url && item.link_url.trim().length > 0) {
      return item.link_url;
    }
    return "#";
  };

  return (
    <div className="tp-portfolio-11-area fix">
      <div className="tp-portfolio-11-slider-wrap p-relative">
        {/* MAIN SLIDER */}
        <TypedSlider
          {...slider_setting_one}
          asNavFor={slider2}
          ref={(slider: any) => setSlider1(slider)}
          className="tp-portfolio-11-slider-active"
        >
          {sliderData.map((item) => {
            const bg =
              item.hero_bg_url && item.hero_bg_url.length > 0
                ? item.hero_bg_url
                : item.image_url;

            return (
              <div key={item.id}>
                <div
                  className="tp-portfolio-11-slider-bg pt-170 pb-150 d-flex align-items-end"
                  style={{
                    backgroundImage: bg ? `url(${bg})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* 🔥 Black overlay (does not block clicks) */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.45)",
                      pointerEvents: "none",
                    }}
                  />

                  <div
                    className="tp-portfolio-11-slider-content"
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <div className="tp-portfolio-11-slider-link">
                      <Link href={getSlideLink(item)}>
                        <DownArrow />
                      </Link>
                    </div>

                    {item.subtitle && (
                      <span className="tp-portfolio-11-slider-subtitle">
                        {item.subtitle}
                      </span>
                    )}

                    <h3 className="tp-portfolio-11-slider-title">
                      <Link
                        href={getSlideLink(item)}
                        // keep <br> support
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </TypedSlider>

        <div className="dddd"></div>

        {/* THUMB SLIDER */}
        <div className="tp-portfolio-11-slider-nav-wrap z-index-5">
          <div className="slides-numbers d-none d-lg-flex d-flex align-items-center">
            <div className="slider-line"></div>
            <span className="active">
              {sliderIndex < 10 ? `0${sliderIndex}` : sliderIndex}
            </span>
          </div>

          <TypedSlider
            {...slider_setting_two}
            asNavFor={slider1}
            ref={(slider: any) => setSlider2(slider)}
            afterChange={(index: number) => setSliderIndex(index + 1)}
            className="tp-portfolio-11-slider-nav-active d-none d-lg-block"
          >
            {sliderData.map((item) => (
              <div
                key={item.id}
                className="tp-portfolio-11-slider-nav-item p-relative"
              >
                <div
                  className="tp-portfolio-11-slider-nav-thumb"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {item.image_url && (
                    <>
                      <Image
                        src={item.image_url}
                        alt={item.subtitle || "portfolio thumbnail"}
                        width={300}
                        height={400}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                      {/* 🔥 Black overlay on thumbnail */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.45)",
                          pointerEvents: "none",
                        }}
                      />
                    </>
                  )}
                </div>

                <div
                  className="tp-portfolio-11-slider-nav-content-wrap"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className="tp-portfolio-11-slider-nav-content d-flex flex-column justify-content-between">
                    {/* Using order_index as small label */}
                    <div className="tp-portfolio-11-slider-nav-year">
                      <span>{item.order_index}</span>
                    </div>

                    <div className="tp-portfolio-11-slider-nav-tittle-box">
                      {item.subtitle && (
                        <span className="tp-portfolio-11-slider-nav-subtittle">
                          {item.subtitle}
                        </span>
                      )}
                      <h4 className="tp-portfolio-11-slider-nav-tittle">
                        <Link href={getSlideLink(item)}>
                          {item.title.replace(/<br>/g, " ")}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TypedSlider>
        </div>
      </div>
    </div>
  );
}
