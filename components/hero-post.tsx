import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags?: string[];
};

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 font-bold text-4xl lg:text-5xl leading-tight">
            <Link
              as={`/posts/${slug}`}
              href="/posts/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <p className="text-2xl leading-relaxed mb-4">
            <i>{excerpt}</i>
          </p>
        </div>
        <div>
          <p
            style={{
              backgroundColor: "#e9e5d5",
              padding: "6px",
              border: "1px solid #ccc",
              marginBottom: "9px",
              display: "inline-block",
              borderRadius: "8px",
            }}
            className="text-2xl leading-relaxed mb-4"
          >
            {tags}
          </p>
        </div>
        <div>
          <div className="mb-4 md:mb-7 text-2xl">
            <DateFormatter dateString={date} />
          </div>
          <div className="mb-4 md:mb-5 text-2xl">
            <Avatar name={author.name} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
