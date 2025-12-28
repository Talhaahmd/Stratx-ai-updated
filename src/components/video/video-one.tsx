'use client';
import React from 'react';

const VideOne = () => {
  return (
    <div className="tp-hero-bottom-img-wrap">
      <div className="tp-hero-bottom-img">
        <video
          src="https://res.cloudinary.com/dt93sahp2/video/upload/ai_video_short_lkasrf.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        ></video>
      </div>
    </div>
  );
};

export default VideOne;
