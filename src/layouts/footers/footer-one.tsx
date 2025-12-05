"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import BrandLogoText from "@/components/common/brand-logo-text";
import { footerOneAnimation } from "@/utils/footer-anim";

// Match navbar buttons: HOME, ABOUT, PORTFOLIO, BLOG, CONTACT
const footer_links = [
  { link: "/", title: "Home" },
  { link: "/about-us", title: "About" },
  { link: "/home-11", title: "Portfolio" }, // adjust if your portfolio route is different
  { link: "/blog-list", title: "Blog" },
  { link: "/contact", title: "Contact" },
];

export default function FooterOne() {
  const [isActive, setIsActive] = React.useState(false);

  useEffect(() => {
    footerOneAnimation();
  }, []);

  return (
    <footer>
      {/* footer area start */}
      <div className="tp-footer-area black-bg pt-90">
        <div className="container-fluid">
          <div className="tp-footer-wrap">
            <div className="row align-items-end">
              {/* LEFT: MENU (same items as navbar) */}
              <div className="col-xl-5 col-lg-6">
                <div className="tp-footer-menu menu-anim">
                  <ul className="counter-row tp-text-anim">
                    {footer_links.map((item, i) => (
                      <li
                        key={i}
                        onMouseEnter={() => setIsActive(true)}
                        onMouseLeave={() => setIsActive(false)}
                        className={isActive ? "" : "active"}
                      >
                        <Link href={item.link}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT: CONTACT + SOCIAL */}
              <div className="col-xl-5 col-lg-6">
                <div className="tp-footer-middle-wrap">
                  <div className="tp-footer-content">
                    <h4 className="tp-footer-big-title footer-big-text">
                      {"Let's"} Contact!
                    </h4>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-widget">
                        <h4 className="tp-footer-title tp_fade_bottom">
                          Say hello at:
                        </h4>
                        <div className="tp-footer-widget-info">
                          <div className="tp-footer-widget-info-mail tp_fade_bottom">
                            <Link href="mailto:info@klarus.io">
                              info@stratx.io
                            </Link>
                          </div>
                          <div className="tp-footer-widget-info-location tp_fade_bottom">
                            <Link href="#" target="_blank">
                              GTA, Canada. <br /> Lahore, Pakistan
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <div className="tp-footer-widget">
                        <h4 className="tp-footer-title tp_fade_bottom">
                          Stalk us
                        </h4>
                        <ul className="tp-footer-widget-social">
                          <li className="tp_fade_bottom">
                            <Link
                              href="https://www.instagram.com/klarus.ai/"
                              target="_blank"
                            >
                              Instagram <br />
                            </Link>
                            <Link
                              href="https://www.linkedin.com/company/klarus-ai/"
                              target="_blank"
                            >
                              LinkedIn
                            </Link>
                          </li>
                          <li className="tp_fade_bottom"></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END RIGHT */}
            </div>
          </div>
        </div>

        {/* copyright area start */}
        <div className="container-fluid">
          <div className="tp-copyright-wrap">
            <div className="row align-items-center">
              <div className="col-xl-6 col-md-4">
                <div className="tp-copyright-logo text-center text-md-start">
                  <Link href="/">
                    <BrandLogoText />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-md-8">
                <div className="tp-copyright-text text-center text-md-end">
                  <p>Copyright @2025 Klarus AI. All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* copyright area end */}
      </div>
      {/* footer area end */}
    </footer>
  );
}
