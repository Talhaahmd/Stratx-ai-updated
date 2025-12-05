"use client";
import { gsap } from "gsap";
import React from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

import Wrapper from "@/layouts/wrapper";
import HeaderEleven from "@/layouts/headers/header-eleven";
import FooterTwo from "@/layouts/footers/footer-two";
import BlogDetailsArea from "@/components/blog/details/blog-details-area";
import BlogDetailsBreadcrumb from "@/components/blog/details/blog-details-breadcrumb";
import BlogDetailsRelatedPosts from "@/components/blog/details/blog-details-related-posts";
import { charAnimation } from "@/utils/title-animation";
import { IdProps } from "@/types/custom-d-t";

const BlogDetailsMain = ({ id }: IdProps) => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const currentSlug = String(id); // works whether id is number or string

  return (
    <Wrapper>
      <HeaderEleven transparent={true} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <BlogDetailsBreadcrumb id={id} />
            <BlogDetailsArea id={id} />

            {/* related posts now receives required prop */}
            <BlogDetailsRelatedPosts currentSlug={currentSlug} />
          </main>

          <FooterTwo topCls="" />
        </div>
      </div>
    </Wrapper>
  );
};

export default BlogDetailsMain;
