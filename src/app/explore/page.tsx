import Footer from "@/components/Footer";
import { travelers } from "@/app/mockData";
import PhotoGrid from "@/components/PhotoGrid";

export default function ExplorePage() {
  const allPosts = travelers.flatMap((traveler) => traveler.posts);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Explore</h1>
        <p className="mb-6 text-gray-600">
          Discover new places and adventures from our travelers.
        </p>
        <PhotoGrid posts={allPosts} />
      </main>
      <Footer />
    </div>
  );
}
