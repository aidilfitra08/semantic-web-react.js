import React from 'react'
import './CardCompt.css'

export const CardCompt = (props) => {
  return (
    <div key={props.id} className="code-list">
            <ul>
                <li>
                    <div className="title">
                        <h2>Pengunjung {props.id+1}</h2>
                    </div>
                    <div className="content">
                        <h3>Name : {props.name}</h3>
                        <h3>Age : {props.age}</h3>
                        <h3>Gender : {props.gender}</h3>
                        <h3>Job : {props.job}</h3>
                        <h3>Institusi : {props.institusi}</h3>
                        <h3>Jurusan : {props.jurusan}</h3>
                        <h3>Tempat Makan Favorite : {props.favorite_stall}</h3>
                        <h3>Makanan/Minuman Favorite : {props.favorite_food}</h3>
                    </div>
                </li>
            </ul>
        </div>
  )
}
CardCompt.defaultProps = {
    id : '123',
    name : 'abc',
    age : 'abc',
    gender : 'abc',
    job : 'abc',
    institusi : 'abc',
    jurusan : 'abc',
    favorite_stall : 'abc',
    favorite_food : 'abc'
}

export default CardCompt;
