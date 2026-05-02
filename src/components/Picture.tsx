import { img } from "@/lib/img";

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  fetchPriority?: "high" | "low" | "auto";
  width?: number;
  height?: number;
  sizes?: string;
};

export default function Picture({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  width,
  height,
  sizes,
}: Props) {
  const ext = src.match(/\.(jpe?g|png|webp)$/i)?.[1].toLowerCase();
  const webpSrc = ext === "webp" ? src : src.replace(/\.(jpe?g|png)$/i, ".webp");
  return (
    <picture>
      {ext !== "webp" && <source srcSet={img(webpSrc)} type="image/webp" sizes={sizes} />}
      <img
        src={img(src)}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        // @ts-expect-error fetchPriority is valid HTML but not in React types yet
        fetchpriority={fetchPriority}
        width={width}
        height={height}
        sizes={sizes}
      />
    </picture>
  );
}
