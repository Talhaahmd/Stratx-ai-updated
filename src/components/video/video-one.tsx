'use client';
import React from 'react';

const VideOne = () => {
  return (
    <div className="tp-hero-bottom-img-wrap">
      <div className="tp-hero-bottom-img">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dt93sahp2&public_id=ai_video_short_lkasrf&profile=cld-default&autoplay=true&loop=true&muted=true"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ borderRadius: '0px', overflow: 'hidden' }}
        ></iframe>
      </div>
    </div>
  );
};

export default VideOne;
