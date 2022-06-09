import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Highlights</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='หาดป่าตอง แลนด์มาร์คของภูเก็ตที่ใครๆ ก็ต้องมาเช็คอินสักครั้ง'
              label='Natural'
              path='/map'
            />
            <CardItem
              src='images/img-2.jpg'
              text='วัดศรีสุนทร เป็นวัดที่โดดเด่นด้วย พระพุทธรูปนอนขนาดใหญ่ กว่า 95 ฟุต'
              label='Temple'
              path='/map'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='สันติ์สุริย์ ภูเก็ต หนึ่งในที่พักที่สวยและเงียบสงบที่สุดบนหาดในหาน'
              label='Hotel'
              path='/map'
            />
            <CardItem
              src='images/img-4.jpg'
              text='แหลมพรหมเทพ จุดชมพระอาทิตย์ตก รับลมทะเลเย็นๆและยังโรแมนติกอีกด้วย'
              label='Natural'
              path='/map'
            />
            <CardItem
              src='images/img-8.jpg'
              text='วัดพระทอง สิ่งที่โดดเด่นของที่นี่ คือ พระผุด พระพุทธรูปที่โผล่ขึ้นมาจากพื้นดินเพียงครึ่งองค์'
              label='Temple'
              path='/map'
            />
            
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-10.jpg'
              text='แหลมกระทิง จุดชมวิวพระอาทิตย์ตก แต่ในการเข้าไปเที่ยวชมค่อนข้างลำบากค่ะ ทำให้มีคนไปยังน้อยอยู่'
              label='Natural'
              path='/map'
            />
            <CardItem
              src='images/img-11.jpg'
              text='เกาะไม้ท่อน น้ำทะเลของที่นี่ใสสุดๆ แถมสามารถดำน้ำชมปะการัง และน้องปลานีโม่ได้จากหน้าเกาะเลยทีเดียว'
              label='Natural'
              path='/map'
            />
            <CardItem
              src='images/img-12.jpg'
              text='ภูเก็ตแมริออทรีสอร์ทแอนด์ รีสอร์ทระดับห้าดาวที่สงบร่มรื่น เหมาะสำหรับทั้งครอบครัว กลุ่มเพื่อน และคู่รัก'
              label='Hotel'
              path='/map'
            />
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;