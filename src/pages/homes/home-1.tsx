"use client";

import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText, cursorAnimation } from "@/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import HeroBannerOne from "@/components/hero-banner/hero-banner-one";
import VideOne from "@/components/video/video-one";
import BrandOne from "@/components/brand/brand-one";
import ServiceOne from "@/components/service/service-one";
import AwardOne from "@/components/award/award-one";
import FooterOne from "@/layouts/footers/footer-one";
import PortfolioSliderHomeTen from "@/components/portfolio/slider/portfolio-slider-home-ten";
import BlogOne from "@/components/blog/blog-one";
import LineImgSlider from "@/components/line-text/line-img-slider";
import ServiceHero from "@/components/service/service-hero";

// images
import shape_1 from "@/assets/img/home-01/footer/footer-circle-shape-1.png";
import shape_2 from "@/assets/img/home-01/footer/footer-circle-shape-2.png";

// animations
import { videoAnimOne } from "@/utils/video-anim";
import { teamMarqueAnim } from "@/utils/scroll-marque";
import { hoverBtn } from "@/utils/hover-btn";
import { footerTwoAnimation } from "@/utils/footer-anim";
import { bounceAnimation, charAnimation, fadeAnimation } from "@/utils/title-animation";
import { aboutAnim } from "@/utils/about-anim";               // ✅ added

const HomeMain = () => {
  useScrollSmooth();

  useEffect(() => {
    document.body.classList.add("tp-smooth-scroll");
    return () => {
      document.body.classList.remove("tp-smooth-scroll");
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("tp-magic-cursor");
    return () => {
      document.body.classList.remove("tp-magic-cursor");
    };
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      document.querySelector(".tp-magic-cursor")
    ) {
      cursorAnimation();
    }
  }, []);

  useGSAP(() => {
    const timer = setTimeout(() => {
      // video section animation
      videoAnimOne();

      // project pin animation
      gsap.timeline({
        scrollTrigger: {
          trigger: ".tp-project-full-img-wrap",
          start: "top 65",
          end: "bottom 0%",
          pin: ".tp-project-full-img",
          pinSpacing: false,
        },
      });

      // marquee, buttons, footer, titles, etc.
      teamMarqueAnim();
      hoverBtn();
      footerTwoAnimation();
      fadeAnimation();
      charAnimation();

      // ✅ about section animation (same as Home 2)
      aboutAnim();

      bounceAnimation();
    }, 100);

    return () => clearTimeout(timer);
  });

  return (
    <Wrapper showBackToTop={false}>
      {/* magic cursor */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>

      {/* header */}
      <HeaderOne />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* hero */}
            <HeroBannerOne />
            {/* video */}
            <VideOne />
            {/* brands */}
            <BrandOne />

            <div style={{ height: "120px" }}></div>

            {/* portfolio slider */}
            <PortfolioSliderHomeTen />

            {/* services */}
            <ServiceOne />

            {/* ✅ about section (copied from Home 2) */}

            {/* awards */}
            <AwardOne />

            {/* blog */}
            <BlogOne />
          </main>

          {/* footer */}
          <FooterOne />
        </div>
      </div>

      {/* footer shape */}
      <div className="tp-footer-shape-wrap z-index-5 smooth">
        <Link href="/contact">
          <div className="tp-footer-shape p-relative">
            <Image className="img-1" src={shape_1} alt="shape" />
            <Image className="img-2" src={shape_2} alt="shape" />
            <span></span>
          </div>
        </Link>
      </div>
    </Wrapper>
  );
};

export default HomeMain;
