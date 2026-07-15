import LenisScroll from "@/components/LenisScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Experiences from "@/components/Experiences";
import Pricing from "@/components/Pricing";
import BookingCTA from "@/components/BookingCTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Smooth scroll engine */}
      <LenisScroll />

      {/* Premium cursor follow glow */}
      <CustomCursor />
      
      {/* Navigation header */}
      <Navbar />

      {/* Content wrapper */}
      <main className="relative w-full min-h-screen flex flex-col bg-[#050505] overflow-x-hidden">
        <Hero />
        <Stats />
        <About />
        <Gallery />
        <Experiences />
        <Pricing />
        <BookingCTA />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer details */}
      <Footer />
    </>
  );
}
