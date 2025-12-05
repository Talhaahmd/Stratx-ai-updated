"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { parallaxSlider } from "@/utils/parallax-slider";
import { supabase } from "@/utils/supabaseClient";

type PortfolioRow = {
  id: number;
  subtitle: string;
  title: string;
  img: string;
};

export default function PortfolioSliderHomeTwelve() {
  const [items, setItems] = useState<PortfolioRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from("portfolio_thumbs")
        .select("id, subtitle, title, img")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Supabase portfolio_thumbs error:", error.message);
        setErrorMsg(error.message);
        setItems([]);
      } else {
        setItems((data as PortfolioRow[]) || []);
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Run parallax only after data is present
  useEffect(() => {
    if (items.length > 0) {
      const timer = setTimeout(() => {
        parallaxSlider();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [items]);

  // Loading state
  if (loading) {
    return (
      <div className="parallax-slider-wrapper">
        <p style={{ padding: 50 }}>Loading projects...</p>
      </div>
    );
  }

  // Error or empty state
  if (errorMsg || !items.length) {
    return (
      <div className="parallax-slider-wrapper">
        <p style={{ padding: 50 }}>
          {errorMsg
            ? `Supabase error: ${errorMsg}`
            : "No projects found."}
        </p>
      </div>
    );
  }

  // ✅ Same structure / classes as original theme
  return (
    <div className="parallax-slider-wrapper">
      <div className="parallax-slider">
        <div className="parallax-slider-inner">
          {items.map((item) => (
            <div
              className="parallax-item not-hide-cursor"
              data-cursor="View<br>Demo"
              key={item.id}
            >
              <Link
                className="cursor-hide"
                href="/portfolio-showcase-details"
              >
                <div className="parallax-content">
                  <span>{item.subtitle}</span>
                  <h4>{item.title}</h4>
                </div>

                {/* keep same class, just feed DB image as BG */}
                <div
                  className="parallax-img"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
