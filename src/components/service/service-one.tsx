import React from "react";
import Image from "next/image";
import Link from "next/link";

// service images
import s_1 from "@/assets/img/home-01/service/service-icon-1.png";
import s_2 from "@/assets/img/home-01/service/service-icon-2.png";
import s_3 from "@/assets/img/home-01/service/service-icon-3.png";
import s_4 from "@/assets/img/home-01/service/service-icon-4.png";

// service data
const service_data = [
  {
    id: 1,
    title: "AI MARKETING AUTOMATION",
    desc: "We set up AI-powered automation, from chatbots to smart email workflows, so you can engage leads, save time, and scale your marketing.",
    icon: s_1,
  },
  {
    id: 2,
    title: "AD CAMPAIGNS",
    desc: "We run Google / Meta Ads to bring customers to your business, increase sales, and give you full visibility with ad dashboards and tracking.",
    icon: s_2,
  },
  {
    id: 3,
    title: "WEBSITES & SEO",
    desc: "We build fast, mobile-friendly websites with SEO content that helps your business rank higher on Google.",
    icon: s_3,
  },
  {
    id: 5,
    title: "SAAS DEVELOPMENT",
    desc: "We design and develop scalable SaaS products with secure architecture, smooth user experience, and powerful admin dashboards.",
    icon: s_1,
  },
  
  {
    id: 4,
    title: "OFFLINE MARKETING",
    desc: "We support your brand with print materials, packaging, and on-ground marketing to boost visibility.",
    icon: s_4,
  },
];


const ServiceOne = () => {
  return (
    <div className="tp-service-area pt-180 pb-80 tp-btn-trigger">
      <div className="container container-1630">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="tp-service-title-box p-relative">
              <span className="tp-section-subtitle subtitle-position tp-char-animation">Revenue Driven Marketing</span>
              <h4 className="tp-section-title tp-char-animation">
                Full-Service Digital<br />
                <span>Marketing <br /> Agency</span>
              </h4>
            </div>

            <div className="tp-service-left-btn tp-btn-bounce">
              <Link className="tp-btn-border" href="/service">
                <span className="tp-btn-border-wrap">
                  <span className="text-1">See All Services</span>
                  <span className="text-2">See All Services</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="tp-service-right-wrap">
              {service_data.map((s, i) => (
                <div
                  key={s.id}
                  className="tp-service-item d-flex align-items-start mb-75 tp_fade_bottom"
                >
                  <div className="tp-service-icon">
                    <Image src={s.icon} alt="icon" style={{ height: "auto" }} />
                  </div>
                  <div className="tp-service-content">
                    <h4 className="tp-service-title-sm order-0">
                      <Link href="/service-details">{s.title}</Link>
                    </h4>
                    <p className="order-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceOne;
