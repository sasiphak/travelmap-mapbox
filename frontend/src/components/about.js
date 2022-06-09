import React from 'react';
import './about.css';
import CardAbout from './CardAbout';
import ape from '../components/pages/About/1.jpg'
import namtan from '../components/pages/About/2.jpg'
import Bank from '../components/pages/About/3.jpg'
function About() {
  return (
    <div className='cards'>
      <h1><u>เกี่ยวกับเรา<br></br></u></h1>
  
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardAbout
              src={ape}
              text='นายณัฐวัชร กรุดมินบุรี &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
               E-mail: nutthawat.gr@kkumail.com'
              label='เอฟ'            
            />
            <CardAbout
              src={namtan}
              text='นางสาวศศิพักตร์ เกตุอินทร์&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; 
              E-mail: sasiphak.ketin@kkumail.com '
              label='น้ำตาล'
            />
            <CardAbout
              src={Bank}
              text='นายพีรภัทร์  ชาเหลา&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; 
              E-mail: chpeerapat@kkumail.com'
              label='แบงค์'  
            />
            
          </ul> 
        </div>
      </div>
    </div>
  );
}

export default About;