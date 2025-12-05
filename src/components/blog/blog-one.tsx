"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import BlogItemTwo from "./blog-item/blog-item-2";

type BlogFromDb = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  created_at?: string;
};

const BLOGS_TO_SHOW = 4;

export default function BlogOne() {
  const [blogs, setBlogs] = useState<BlogFromDb[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();

    const channel = supabase
      .channel("blog-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blogs",
        },
        () => {
          fetchBlogs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="tp-blog-area pb-70">
        <div className="container container-1775">
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (!blogs.length) return null;

  const visibleBlogs = blogs.slice(0, BLOGS_TO_SHOW);

  return (
    <div className="tp-blog-area pb-70">
      <div className="container container-1775">
        {/* ✅ Centered heading */}
        <div className="row mb-40">
          <div className="col-12 text-center">
            <h2
              style={{
                fontSize: "38px",
                fontWeight: "700",
              }}
            >
              What&apos;s Happening in the AI World
            </h2>
          </div>
        </div>

        {/* Blog grid */}
        <div className="row">
          {visibleBlogs.map((item) => {
            const adaptedItem = {
              ...item,
              img: item.image,
            };

            return (
              <div
                key={item.id}
                className="col-6 col-md-6 col-lg-3 mb-50"
              >
                <BlogItemTwo item={adaptedItem} />
              </div>
            );
          })}
        </div>

        {/* ✅ Load more button that redirects */}
        {blogs.length > BLOGS_TO_SHOW && (
          <div className="text-center mt-30">
            <button
              onClick={() => router.push("/blog-list")}
              className="tp-btn"
              style={{
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
