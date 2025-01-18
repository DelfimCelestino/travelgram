import Image from "next/image";
import { Post } from "@/types/post";
import Link from "next/link";

interface PhotoGridProps {
  posts: Post[];
}

export default function PhotoGrid({ posts }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
      {posts.map((post, index) => {
        // No mobile (2 colunas): aplicar rowspan na segunda coluna a cada 2 itens
        // No desktop (3 colunas): aplicar rowspan na terceira coluna a cada 3 itens
        const isSpanningColumn = {
          mobile: index % 2 === 1, // Segunda coluna no mobile
          desktop: index % 3 === 2, // Terceira coluna no desktop
        };

        const shouldSpanRows = {
          mobile: Math.floor(index / 2) % 2 === 0, // Alterna a cada 2 itens no mobile
          desktop: Math.floor(index / 3) % 2 === 0, // Alterna a cada 3 itens no desktop
        };

        // Classes condicionais para rowspan
        const spanClasses = `
              ${
                isSpanningColumn.mobile && shouldSpanRows.mobile
                  ? "md:row-span-1 row-span-2"
                  : ""
              }
              ${
                isSpanningColumn.desktop && shouldSpanRows.desktop
                  ? "md:row-span-2"
                  : ""
              }
            `.trim();

        return (
          <Link
            href={`/post/${post.id}`}
            key={index}
            className={`relative overflow-hidden rounded-lg ${spanClasses}`}
            style={{ height: "100%" }}
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={`Post by traveler ${post.id}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={index <= 2}
            />
          </Link>
        );
      })}
    </div>
  );
}
