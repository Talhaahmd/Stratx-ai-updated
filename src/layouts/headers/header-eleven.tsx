"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cart } from "@/components/svg";
import HeaderMenus from "./header-menus";
import BrandLogoText from "@/components/common/brand-logo-text";
import CartOffcanvas from "@/components/offcanvas/cart-offcanvas";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";
import useStickyHeader from "@/hooks/use-sticky-header";

type IProps = {
  transparent?: boolean;
  cls?: string;
};

export default function HeaderEleven({ transparent = false, cls = "" }: IProps) {
  const { isSticky, headerFullWidth } = useStickyHeader(20);
  const [openCartMini, setOpenCartMini] = useState(false);
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run DOM-related logic on the client
    headerFullWidth();
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent SSR/CSR markup mismatches
  if (!mounted) {
    return null;
  }

  return (
    <>
      <header className="tp-header-height z-index-5">
        <div
          id="header-sticky"
          className={`tp-inner-header-area ${cls} ${
            transparent ? "transparent" : "tp-inner-header-style-2"
          } tp-inner-header-mob-space ${isSticky ? "header-sticky" : ""}`}
        >
          <div className="container container-1800">
            <div className="row align-items-center">
              {/* Logo */}
              <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                <div className="tp-inner-header-logo tp-header-logo">
                  <Link
                    className={transparent ? "ab-logo-1" : "logo-1"}
                    href="/"
                  >
                    <BrandLogoText />
                  </Link>
                  <Link
                    className={transparent ? "ab-logo-2" : "logo-2"}
                    href="/"
                  >
                    <BrandLogoText />
                  </Link>
                </div>
              </div>

              {/* Desktop menu */}
              <div className="col-xl-8 col-lg-8 d-none d-xl-block">
                <div className="tp-inner-header-right-wrap text-center">
                  <div className="tp-inner-header-menu header-main-menu">
                    <nav className="tp-main-menu-content">
                      <HeaderMenus />
                    </nav>
                  </div>
                </div>
              </div>

              {/* Right actions (cart + mobile menu) */}
              <div className="col-xl-2 col-lg-6 col-md-6 col-6">
                <div className="tp-inner-header-right-action text-end">
                  <ul>
                    <li>
                      <div className="tp-inner-cart">
                        <button
                          type="button"
                          onClick={() => setOpenCartMini(true)}
                          className="cartmini-open-btn pointer"
                          aria-label="Open cart"
                        >
                          <span className="p-relative">
                            <Cart />
                            <i>0</i>
                          </span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="tp-inner-bar tp-header-bar">
                        <button
                          type="button"
                          onClick={() => setOpenOffCanvas(true)}
                          className="tp-offcanvas-open-btn"
                          aria-label="Open navigation menu"
                        >
                          <span></span>
                          <span></span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /Right actions */}
            </div>
          </div>
        </div>
      </header>

      {/* cart mini */}
      <CartOffcanvas
        openCartMini={openCartMini}
        setOpenCartMini={setOpenCartMini}
      />

      {/* mobile offcanvas menu */}
      <MobileOffcanvas
        openOffcanvas={openOffCanvas}
        setOpenOffcanvas={setOpenOffCanvas}
      />
    </>
  );
}
