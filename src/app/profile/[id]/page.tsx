import { notFound } from "next/navigation";
import ProfileDetails from "@/components/ProfileDetails";
import PhotoGrid from "@/components/PhotoGrid";
import Footer from "@/components/Footer";
import { travelers } from "@/app/mockData";
import Header from "@/components/Header";

type Props = Promise<{
  id: string;
}>;

export default async function TravelgramProfile({ params }: { params: Props }) {
  const { id } = await params;

  const traveler = travelers.find((t) => t.id === Number(id));

  if (!traveler) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProfileDetails traveler={traveler} />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <PhotoGrid posts={traveler.posts} />
      </section>
      <Footer />
    </div>
  );
}
