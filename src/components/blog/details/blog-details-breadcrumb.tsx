"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import overlay from "@/assets/img/inner-blog/blog-details/bg-shape/overly.png";
import avatarFallback from "@/assets/img/inner-blog/blog-details/avatar/avatar-2.jpg";
import { IdProps } from "@/types/custom-d-t";
import { supabase } from "@/utils/supabaseClient";

type BlogMeta = {
  title: string;
  category: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  author_name: string | null;
  author_avatar_url: string | null;
  hero_image_url: string | null;
};

export default function BlogDetailsBreadcrumb({ id }: IdProps) {
  const [blog, setBlog] = useState<BlogMeta | null>(null);

  useEffect(() => {
    const fetchBlogMeta = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(
          "title, category, published_at, read_time_minutes, author_name, author_avatar_url, hero_image_url"
        )
        .eq("slug", id) // 👈 if you use numeric IDs, change to: .eq("id", id)
        .single();

      if (error) {
        console.error("Supabase blog meta error:", error.message);
        setBlog(null);
      } else {
        setBlog(data as BlogMeta);
      }
    };

    if (id) fetchBlogMeta();
  }, [id]);

  const publishedDate = blog?.published_at
    ? new Date(blog.published_at).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const heroBg =
    blog?.hero_image_url ||
    "/assets/img/inner-blog/blog-details/blog-details-1.jpg";

  return (
    <div className="blog-details-area">
      <div
        className="blog-details-bg blog-details-bg-height blog-details-overlay p-relative d-flex align-items-end pt-170 pb-170"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="blog-details-overlay-shape">
          <Image src={overlay} alt="overlay" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-11">
              <div className="blog-details-content z-index-5">
                <span className="blog-details-meta">
                  {blog?.category || "Blog"}{" "}
                  {publishedDate && (
                    <>
                      <i>. {publishedDate}</i>
                    </>
                  )}
                </span>
                <h4 className="blog-details-title tp-char-animation">
                  {blog?.title || "Blog Details"}
                </h4>
                <div className="blog-details-top-author d-flex align-items-center">
                  <Image
                    src={blog?.author_avatar_url || avatarFallback}
                    alt="avatar"
                    width={48}
                    height={48}
                  />
                  <span>
                    {blog?.author_name || "Author"}{" "}
                    {blog?.read_time_minutes && (
                      <>
                        / <i>{blog.read_time_minutes} min</i>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
