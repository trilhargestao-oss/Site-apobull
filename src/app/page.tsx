import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { History } from "@/components/History";
import { Squad } from "@/components/Squad";
import { Categories } from "@/components/Categories";
import { Gallery } from "@/components/Gallery";
import { News } from "@/components/News";
import { Sponsors } from "@/components/Sponsors";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <History />
      <Squad />
      <Categories />
      <Gallery />
      <News />
      <Sponsors />
      <Footer />
    </main>
  );
}
