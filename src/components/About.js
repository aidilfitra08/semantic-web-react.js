import React from 'react';
import Img from './../assets/image/me.jpg';
import './about.css';

function About() {
  return (
    <div className="about-container">
        <div className="about-content">
            <h1 className="title">
                Pujasera Visitor
            </h1>
            <p className='sub-title'>Pengunjung Pujasera Ciseke, Jatinangor</p>
            <p className='explanation'>Pujasera Visitor adalah aplikasi untuk mengetahui tipe-tipe pengunjung apa saja serta perilaku pengunjung (seperti: pesanan apa yang sering dipesan atau warung yang sering dikunjungi) yang datang ke Pujasera Ciseke, Jatinangor.</p>
        </div>
        <div className="author">
            <h2>Developer</h2>
            <div className="grid">
                 <div className="img-wrap">
                    <img src={Img} alt="" />
                </div>
                <div className="bio">
                    <p>Name : Aidil Fitra</p>
                    <p>NPM : 140810190053</p>
                    <p>Institute : Universitas Padjadjaran</p>
                </div>
                
            </div>
        </div>
    </div>
    
  )
}

export default About