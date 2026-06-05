import Navbar from '../components/Navbar';
import HeroVideo from '../components/HeroVideo';
import ShowcaseSection from '../components/ShowcaseSection';
import FeaturedDrinks from '../components/FeaturedDrinks';
import AboutSection from '../components/AboutSection';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden text-white">
      <Navbar />
      <HeroVideo />
      <FeaturedDrinks />
      <AboutSection />
      <ShowcaseSection />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
};

export default Home;
