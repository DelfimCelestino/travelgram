import Stories from "@/components/Stories";
import PostCard from "@/components/PostCard";
import Footer from "@/components/Footer";
import { travelers } from "@/app/mockData";

export default function TravelgramFeed() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-2xl px-4 py-6">
        <Stories />
        <div className="mt-6 space-y-6">
          {travelers.map((traveler) =>
            traveler.posts.map((post) => (
              <PostCard key={post.id} traveler={traveler} post={post} />
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
