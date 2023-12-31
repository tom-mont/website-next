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

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 font-bold leading-snug">
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <h4 className="text-xl leading-relaxed mb-5">
        <i>{excerpt}</i>
      </h4>
      <h4
        style={{
          backgroundColor: "#e9e5d5",
          padding: "6px",
          border: "1px solid #ccc",
          marginBottom: "9px",
          display: "inline-block",
          borderRadius: "8px",
        }}
        className="text-l leading-relaxed mb-5"
      >
        {tags}
      </h4>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>

      <Avatar name={author.name} />
    </div>
  );
};

export default PostPreview;
