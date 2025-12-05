import React from "react";
import Image from "next/image";
import { scroller } from "react-scroll";
import Link from "next/link";

type Project = {
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

export default function PortfolioDetailsShowcaseArea({
  project,
}: {
  project: Project;
}) {
  const scrollTo = () => {
    scroller.scrollTo("xyz", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  const {
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
    challenge_text,
  } = project;

  return (
    <>
      {/* details area */}
      <div className="tp-showcase-details-area">
        <div
          className="tp-showcase-details-bg d-flex align-items-center justify-content-center include-bg p-relative"
          style={{
            backgroundImage: hero_bg_url
              ? `url(${hero_bg_url})`
              : "url(/assets/img/inner-project/showcase/showcase-1.jpg)",
          }}
        >
          <div className="tp-showcase-details-scroll smooth">
            <a onClick={scrollTo} className="pointer">
              <i className="fa-sharp fa-light fa-angle-down"></i>
              Scroll or drag to navigate
            </a>
          </div>
          <div className="port-showcase-slider-social tp-hover-btn-wrapper">
            <Link className="tp-hover-btn-item tp-hover-btn" href="#">
              Fb
            </Link>
            <Link className="tp-hover-btn-item tp-hover-btn" href="#">
              In
            </Link>
            <Link className="tp-hover-btn-item tp-hover-btn" href="#">
              Be
            </Link>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tp-showcase-details-content text-center">
                  <span className="port-showcase-slider-subtitle tp_title_anim">
                    {category || "[ UI, Web Design ]"}
                  </span>
                  <h4 className="port-showcase-slider-title tp-char-animation">
                    {title}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* details area */}

      {/* details overview */}
      <div id="xyz" className="showcase-details-overview pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="showcase-details-overview-left">
                <span className="showcase-details-subtitle">Overview</span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="showcase-details-overview-right">
                <p className="tp_title_anim">
                  {overview ||
                    "Project overview goes here. You can edit this text from Supabase."}
                </p>
                <div className="showcase-details-overview-info">
                  <div className="showcase-details-overview-info-item tp_fade_bottom">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="showcase-details-overview-info-left">
                          <span>Client</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="showcase-details-overview-info-right">
                          <span>{client || "StratX"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="showcase-details-overview-info-item tp_fade_bottom">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="showcase-details-overview-info-left">
                          <span>Services</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="showcase-details-overview-info-right">
                          <span>{services || "UI / UX Design"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="showcase-details-overview-info-item tp_fade_bottom">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="showcase-details-overview-info-left">
                          <span>Location</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="showcase-details-overview-info-right">
                          <span>{location || "Remote"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="showcase-details-overview-info-item tp_fade_bottom">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="showcase-details-overview-info-left">
                          <span>Release Date</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="showcase-details-overview-info-right">
                          <span>{release_date || "2024"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* details overview */}

      {/* details thumb */}
      <div className="showcase-details-thumb-wrap pb-40">
        <div className="container container-1430">
          <div className="row gx-80">
            <div className="col-xl-6 col-lg-6">
              <div className="showcase-details-thumb mb-80">
                {detail_img1_url && (
                  <Image
                    data-speed=".8"
                    src={detail_img1_url}
                    alt="details-thumb"
                    width={800}
                    height={600}
                    style={{ height: "auto" }}
                  />
                )}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="showcase-details-thumb mb-80">
                {detail_img2_url && (
                  <Image
                    data-speed=".8"
                    src={detail_img2_url}
                    alt="details-thumb"
                    width={800}
                    height={600}
                    style={{ height: "auto" }}
                  />
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="showcase-details-thumb mb-80">
                {detail_img3_url && (
                  <Image
                    data-speed=".8"
                    src={detail_img3_url}
                    alt="details-thumb"
                    width={1200}
                    height={800}
                    style={{ height: "auto" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* details thumb */}

      {/* details overview (challenge) */}
      <div className="showcase-details-overview pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="showcase-details-overview-left">
                <span className="showcase-details-subtitle fs-40 tp-char-animation">
                  {challenge_title || "The challenge"}
                </span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="showcase-details-overview-right tp_title_anim">
                <p>
                  {challenge_text ||
                    "Challenge description goes here. You can manage this text from Supabase for each project."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* details overview */}
    </>
  );
}
