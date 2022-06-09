import React from 'react';
import '../App.css';
import { ButtonGetStart } from './ButtonGetStart';
import { ButtonWatch } from './ButtonWatch';
import './HeroSection.css';



function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>TRAVEL IN PHUKET</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <ButtonGetStart
          to='/map'
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </ButtonGetStart>
        <ButtonWatch
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </ButtonWatch>
      </div> 
    </div>
  );
}

export default HeroSection;
