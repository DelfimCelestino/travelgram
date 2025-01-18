import { notFound } from "next/navigation";
import { travelers } from "@/app/mockData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostContent from "./postContent";
import Image from "next/image";

type Props = Promise<{
  id: string;
}>;

export default async function PostPage({ params }: { params: Props }) {
  const { id } = await params;
  const traveler = travelers.find((t) =>
    t.posts.some((post) => post.id === Number(id))
  );

  if (!traveler) {
    notFound();
  }

  const post = traveler.posts.find((post) => post.id === Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col md:flex-row mx-auto max-w-7xl px-4 py-8">
        <div className="flex-1">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={`Post by ${traveler.name}`}
            className="w-full h-auto rounded-lg"
            width={500}
            height={500}
          />
        </div>
        <PostContent travelerName={traveler.name} post={post} />
      </div>
      <Footer />
    </div>
  );
}
