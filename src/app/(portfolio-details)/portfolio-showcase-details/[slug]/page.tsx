"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

import Wrapper from "@/layouts/wrapper";
import HeaderEleven from "@/layouts/headers/header-eleven";
import PortfolioDetailsShowcaseArea from "@/components/portfolio/details/portfolio-details-showcase-area";
import FooterTwo from "@/layouts/footers/footer-two";
import {
  charAnimation,
  fadeAnimation,
  titleAnimation,
} from "@/utils/title-animation";
import { supabase } from "@/utils/supabaseClient";

type Project = {
  id: number;
  slug: string | null;
  title: string;
  category: string | null;
  hero_bg_url: string | null;
  overview: string | null;
  client: string | null;
  services: string | null;
  location: string | null;
  release_date: string | null;
  detail_img1_url: string | null;
  detail_img2_url: string | null;
  detail_img3_url: string | null;
  challenge_title: string | null;
  challenge_text: string | null;
};

export default function PortfolioDetailsShowcaseMain() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug; // this is now a plain string, not a Promise

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      titleAnimation();
      fadeAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!slug) return; // wait until we actually have a slug

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("portfolio_slides")
        .select(
          `
          id,
          slug,
          title,
          category,
          hero_bg_url,
          overview,
          client,
          services,
          location,
          release_date,
          detail_img1_url,
          detail_img2_url,
          detail_img3_url,
          challenge_title,
          challenge_text
        `
        )
        .eq("slug", slug)
        .maybeSingle(); // tolerate 0 or 1 row

      if (error) {
        console.error("Error loading project:", error.message);
        setProject(null);
      } else {
        setProject(data as Project | null);
      }
      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <Wrapper>
        <HeaderEleven transparent={true} />
        <div style={{ padding: "120px 20px" }}>Loading project…</div>
      </Wrapper>
    );
  }

  if (!project) {
    return (
      <Wrapper>
        <HeaderEleven transparent={true} />
        <div style={{ padding: "120px 20px" }}>Project not found.</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderEleven transparent={true} />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* portfolio details area */}
            <PortfolioDetailsShowcaseArea project={project} />
            {/* portfolio details area */}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
}
