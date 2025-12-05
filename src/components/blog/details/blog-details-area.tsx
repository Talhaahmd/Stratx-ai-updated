"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogSidebar from "../blog-sidebar";
import { QuoteThree, Share, Tag } from "@/components/svg";
import BlogDetailsAuthor from "./blog-details-author";
import BlogDetailsNavigation from "./blog-details-navigation";
import details_thumb_1 from "@/assets/img/inner-blog/blog-details/blog-details-2.jpg";
import details_thumb_2 from "@/assets/img/inner-blog/blog-details/blog-details-3.jpg";
import details_thumb_3 from "@/assets/img/inner-blog/blog-details/blog-details-4.jpg";
import { supabase } from "@/utils/supabaseClient";
import { IdProps } from "@/types/custom-d-t";

type BlogDetailsType = {
  id: number;
  title: string;
  excerpt: string | null;
  content: string | null; // HTML or markdown
  body_image_urls: string[] | null;
  tags: string[] | null;
};

export default function BlogDetailsArea({ id }: IdProps) {
  const [blog, setBlog] = useState<BlogDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, excerpt, content, body_image_urls, tags")
        .eq("slug", id) // or .eq("id", id) if using numeric id
        .single();

      if (error) {
        console.error("Supabase blog details error:", error.message);
        setBlog(null);
      } else {
        setBlog(data as BlogDetailsType);
      }

      setLoading(false);
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="postbox__area tp-blog-sidebar-sticky-area pt-80 pb-80">
        <div className="container">
          <p>Loading blog...</p>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="postbox__area tp-blog-sidebar-sticky-area pt-80 pb-80">
        <div className="container">
          <p>Blog not found.</p>
        </div>
      </section>
    );
  }

  const bodyImages = blog.body_image_urls || [];

  const firstTwoImages =
    bodyImages.length >= 2
      ? bodyImages.slice(0, 2)
      : [details_thumb_1.src, details_thumb_2.src];

  const thirdImage =
    bodyImages.length >= 3 ? bodyImages[2] : details_thumb_3.src;

  const tags = blog.tags || ["Creative", "Photography", "Lifestyle"];

  return (
    <section className="postbox__area tp-blog-sidebar-sticky-area pt-80 pb-80">
      <div className="container">
        <div className="row gy-4">
          {/* main content */}
          <div className="col-12 col-lg-8">
            <div className="postbox__wrapper">
              {/* excerpt */}
              {blog.excerpt && (
                <div className="blog-details-top-text mb-30">
                  <p>{blog.excerpt}</p>
                </div>
              )}

              {/* title + main content */}
              <div className="blog-details-left-content mb-40">
                <h4 className="blog-details-left-title mb-20">
                  {blog.title}
                </h4>

                {blog.content ? (
                  <div
                    className="tp-blog-content-body"
                    style={{ lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <>
                    <p className="mb-20">
                      <span>Lorem Ipsum</span> is simply dummy text of the
                      printing and typesetting industry...
                    </p>
                    <p>
                      It has survived not only five centuries, but also the leap
                      into electronic typesetting, remaining essentially
                      unchanged.
                    </p>
                  </>
                )}
              </div>

              {/* two images side by side (stack on mobile) */}
              <div className="blog-details-thumb-box mb-40">
                <div className="row g-3">
                  {firstTwoImages.map((src, idx) => (
                    <div key={idx} className="col-12 col-md-6">
                      <div className="blog-details-thumb">
                        <Image
                          className="w-100"
                          src={src}
                          alt={`details-thumb-${idx}`}
                          width={800}
                          height={500}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: 12,
                          }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* extra text / quote */}
              <div className="blog-details-left-content mb-30">
                <h4 className="blog-details-left-title mb-15">
                  Relationship &amp; Communication
                </h4>
                <p>
                  But, like most politicians, he promised more than he could
                  deliver. Why not indeed! Daylight and everything...
                </p>
              </div>

              <div className="blog-details-blockquote mb-30">
                <blockquote>
                  <span className="quote-icon">
                    <QuoteThree />
                  </span>
                  <p>{"Don't"} watch the clock; do what it does. keep going.</p>
                  <span className="blockquote-info">Sam Levenson</span>
                </blockquote>
              </div>

              <div className="blog-details-left-content mb-40">
                <p>
                  With any accomplished project, great time management is an
                  essential component...
                </p>
              </div>

              {/* third image full width */}
              <div className="blog-details-thumb-box mb-40">
                <div className="row">
                  <div className="col-12">
                    <div className="blog-details-thumb">
                      <Image
                        src={thirdImage}
                        alt="details-thumb-3"
                        width={1200}
                        height={700}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 12,
                        }}
                        sizes="100vw"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* tags + share */}
              <div className="blog-details-share-wrap mb-40">
                <div className="row gy-3 align-items-center">
                  <div className="col-12 col-md-8">
                    <div className="blog-details-tag d-flex flex-wrap align-items-center gap-2">
                      <span>
                        <Tag />
                      </span>
                      {tags.map((tag) => (
                        <span key={tag} className="badge bg-light text-dark">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="blog-details-share text-start text-md-end">
                      <span>
                        <Share />
                      </span>
                      <a
                        href={
                          typeof window !== "undefined"
                            ? window.location.href
                            : "#"
                        }
                      >
                        Share Post
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* author + prev/next only (comments removed) */}
              <BlogDetailsAuthor />
              <BlogDetailsNavigation />
            </div>
          </div>

          {/* sidebar (drops below on mobile) */}
          <div className="col-12 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
}
