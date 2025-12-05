"use client";

import React, { CSSProperties } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// shapes (unchanged)
import shape_1 from "@/assets/img/home-03/gallery/gal-shape-1.png";
import shape_d_1 from "@/assets/img/home-03/gallery/gal-shape-dark-1.png";
import shape_2 from "@/assets/img/home-03/gallery/gal-shape-2.png";
import shape_d_2 from "@/assets/img/home-03/gallery/gal-shape-dark-2.png";

// Cloudinary screenshots (web dev + digital marketing)
const baseGalleryImages = [
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153402/Screenshot_2025-08-26_011504_d7wbwb.png",
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153402/Screenshot_2025-08-26_011457_waj12a.png",
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153400/Screenshot_2025-08-26_011036_qdvh6q.png",
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153398/Screenshot_2025-08-26_011243_xkja9o.png",
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153400/Screenshot_2025-08-26_011048_nqimwd.png",
  "https://res.cloudinary.com/dt93sahp2/image/upload/v1756153401/Screenshot_2025-08-26_011420_qbnzyl.png",
];

// repeat once to make the marquee feel continuous
const gallery_images = [...baseGalleryImages, ...baseGalleryImages];

const imgStyle: CSSProperties = { height: "auto" };

export default function GalleryOne() {
  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="tp-gallery-shape-1">
        <Image className="img-1" src={shape_1} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_1} alt="shape" style={imgStyle} />
      </div>

      <div className="tp-gallery-shape-2">
        <Image className="img-1" src={shape_2} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_2} alt="shape" style={imgStyle} />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee
                  className="tp-gallery-titming"
                  speed={100}
                  direction="left"
                  gradient={false}
                >
                  {gallery_images.map((g, i) => (
                    <div key={i}>
                      <div className="tp-gallery-item mr-30">
                        <Image
                          src={g}
                          width={400}
                          height={260}
                          alt="gallery-img"
                          style={{
                            height: "auto",
                            borderRadius: "12px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
