import Image from "next/image";
import Link from "next/link";

type BlogItemProps = {
  item: {
    slug: string;
    title: string;
    excerpt: string;
    img: string;
    date?: string;
  };
};

export default function BlogItemTwo({ item }: BlogItemProps) {
  return (
    <div className="tp-blog-item tp-fade-bottom">
      <div className="tp-blog-thumb fix p-relative">
        <Link href={`/blog-details/${item.slug}`}>
          {/* Fixed aspect-ratio wrapper so all images look the same */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "70%", // ~3:2 ratio – change to 75% for 4:3, 56.25% for 16:9
              overflow: "hidden",
              borderRadius: 16,
            }}
          >
            <Image
              src={item.img}
              alt={item.title || "blog image"}
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>
      </div>

      <div className="tp-blog-content">
        <div className="tp-blog-meta">
          <span>{item.date || ""}</span>
        </div>

        <h3 className="tp-blog-title">
          <Link href={`/blog-details/${item.slug}`}>{item.title}</Link>
        </h3>

        <p>{item.excerpt}</p>
      </div>
    </div>
  );
}
