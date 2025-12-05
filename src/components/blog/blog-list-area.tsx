"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import usePagination from "@/hooks/use-pagination";
import Pagination from "../ui/pagination";
import { supabase } from "@/utils/supabaseClient";

type BlogFromDb = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  created_at?: string;
};

export default function BlogListArea() {
  const [blogs, setBlogs] = useState<BlogFromDb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const memoBlogs = useMemo(() => blogs, [blogs]);

  const { currentItems, handlePageClick, pageCount } = usePagination(
    memoBlogs,
    4
  );

  if (loading) {
    return (
      <div className="tp-blog-list-area mb-30">
        <div className="container container-1480">
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tp-blog-list-area mb-30">
      <div className="container container-1480">
        <div className="tp-blog-list-wrap">
          {currentItems.map((item) => (
            <div key={item.id} className="tp-blog-list-item">
              <div className="row">
                <div className="col-xl-2 col-lg-2 tp-flex-end">
                  <div className="tp-blog-list-meta">
                    <span>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>

                {/* ✅ Fixed Image Wrapper */}
                <div className="col-xl-5 col-lg-5 col-md-7">
                  <div className="tp-blog-list-content-wrap">
                    <div className="tp-blog-list-thumb anim-zoomin-wrap">
                      <Link href={`/blog-details/${item.slug}`}>
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "260px",
                            overflow: "hidden",
                            borderRadius: "12px",
                          }}
                        >
                          <Image
                            src={item.image}
                            alt="blog-img"
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5 col-lg-5 col-md-5">
                  <div className="tp-blog-list-content tp-flex-column">
                    <div className="tp-blog-list-title-wrap">
                      <h4 className="tp-blog-list-title-sm">
                        <Link href={`/blog-details/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>
                    </div>

                    <div className="tp-blog-list-link-wrap">
                      <Link
                        className="tp-blog-list-link"
                        href={`/blog-details/${item.slug}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="col-12">
            <div className="basic-pagination mt-80 d-flex align-items-center justify-content-center">
              <nav>
                <Pagination
                  handlePageClick={handlePageClick}
                  pageCount={pageCount}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
