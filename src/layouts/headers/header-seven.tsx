import React from "react";
import Link from "next/link";
import BrandLogoText from "@/components/common/brand-logo-text";
import { MenuTwo, UpArrowTwo } from "@/components/svg";
import MobileOffcanvasTwo from "@/components/offcanvas/mobile-offcanvas-2";

export default function HeaderSeven() {
  const [openOffCanvas, setOpenOffcanvas] = React.useState(false);
  return (
    <>
    <header>
      <div className="tp-header-7-area d-none d-xl-block">
        <div className="tp-header-7-wrap">
          <div className="tp-header-7-logo">
            <Link href="/">
              <BrandLogoText />
            </Link>
          </div>
          <div className="tp-header-7-menubar">
            <button onClick={() => setOpenOffcanvas(true)} className="tp-offcanvas-open-btn">
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="tp-header-7-btn-box">
            <Link className="tp-btn-white-sm" href="#">
              Let’s talk
              <span>
                <MenuTwo/>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="tp-header-7-area tp-header-7-lg-area d-xl-none">
        <div className="tp-header-7-wrap">
          <div className="tp-header-7-logo tp-header-logo">
            <Link href="/">
              <BrandLogoText />
            </Link>
          </div>
          <div className="tp-header-7-menubar">
            <button onClick={() => setOpenOffcanvas(true)} className="tp-offcanvas-open-btn">
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="tp-header-7-btn-box d-none d-md-block">
            <Link className="tp-btn-white-sm" href="#">
              Let’s talk
              <span>
                <UpArrowTwo/>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* off canvas */}
    <MobileOffcanvasTwo openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffcanvas} />
      {/* off canvas */}
    </>
  );
}
