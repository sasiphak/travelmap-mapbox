import React from 'react';
import '../../App.css';
import '../Slider.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Slider from '../Slider.js';
import { SliderData } from '../SliderData';




function Home() {
  return (
    <>
      <HeroSection />
      <Slider slides={SliderData} />;
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
