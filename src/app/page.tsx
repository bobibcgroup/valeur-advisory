import BackgroundAnimation from "@/components/BackgroundAnimation";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: "#08070A" }}
    >
      <BackgroundAnimation />
      <HeroSection />
    </main>
  );
}
