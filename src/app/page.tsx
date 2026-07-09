import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import MusicSection from "@/components/MusicSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="content-bg">
        <About />
        <Work />
        <MusicSection />
        <Footer />
      </div>
    </>
  );
}
