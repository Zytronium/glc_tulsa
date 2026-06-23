import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { ServiceBar } from "@/components/home/ServiceBar";
import { QuickLinks } from "@/components/home/QuickLinks";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Mission } from "@/components/home/Mission";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceBar />
        <QuickLinks />
        <WhoWeAre />
        <UpcomingEvents />
        <Mission />
      </main>
      <Footer />
    </>
  );
}
