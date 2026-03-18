import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GreenRoom from '@/components/GreenRoom';
import Constellation from '@/components/Constellation';
import Spotlight from '@/components/Spotlight';
import TheScript from '@/components/TheScript';
import LingoSection from '@/components/LingoSection';
import ExCom from '@/components/ExCom';
import Gallery from '@/components/Gallery';
import Encore from '@/components/Encore';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <div className="section-divider" />
        <GreenRoom />
        <div className="section-divider" />
        <Constellation />
        <div className="section-divider" />
        <Spotlight />
        <div className="section-divider" />
        <TheScript />
        <div className="section-divider" />
        <LingoSection />
        <div className="section-divider" />
        <ExCom />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <Encore />
      </main>
      <Footer />
    </>
  );
}
