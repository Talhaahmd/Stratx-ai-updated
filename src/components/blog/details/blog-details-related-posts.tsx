"use client";

import React, { useEffect, useState } from "react";
import BlogItemTwo from "../blog-item/blog-item-2";
import { supabase } from "@/utils/supabaseClient";

type BlogCard = {
  id: number;
  title: string;
  excerpt: string | null;
  slug: string;
  thumbnail_image_url: string | null;
  created_at: string | null;
};

type BlogDetailsRelatedPostsProps = {
  currentSlug?: string; // make it optional to avoid TS errors when not passed
};

export default function BlogDetailsRelatedPosts({
  currentSlug,
}: BlogDetailsRelatedPostsProps) {
  const [related, setRelated] = useState<BlogCard[]>([]);

  useEffect(() => {
    // if we don't know the current slug, don't try to load related posts
    if (!currentSlug) return;

    const fetchRelated = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, excerpt, slug, thumbnail_image_url, created_at")
        .neq("slug", currentSlug)
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setRelated(data);
      }
    };

    fetchRelated();
  }, [currentSlug]);

  // nothing to show
  if (!related.length) return null;

  return (
    <div className="blog-details-realated-area grey-bg-2 pt-90 pb-40">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="blog-details-realated-title-box text-center mb-50">
              <h3 className="blog-details-realated-title">Related posts</h3>
            </div>
          </div>
        </div>

        <div className="row">
          {related.map((item) => {
            const adaptedItem = {
              slug: item.slug,
              title: item.title,
              excerpt: item.excerpt ?? "",
              img:
                item.thumbnail_image_url ??
                "/assets/img/inner-blog/blog-details/blog-details-2.jpg",
              date: item.created_at
                ? new Date(item.created_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "",
            };

            return (
              <div key={item.id} className="col-xl-4 col-lg-6 col-md-6 mb-50">
                <BlogItemTwo item={adaptedItem} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
