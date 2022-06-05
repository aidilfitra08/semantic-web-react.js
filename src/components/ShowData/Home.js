import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';
import Content from './../CardCompt';
import { Footer } from '../Footer';
import Img1 from "./../../assets/image/v1.png";
import Img2 from "./../../assets/image/v2.jpg";

//fungsi untul effect scroll
const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function Home() {
    //inisialisasi variable data
    const [value, setValue] = useState({
        codes: [],
        input: "",
        name : "",
        age : "",
        gender : "",
        job : "",
        institusi : "",
        jurusan : "",
        favorite_stall : "",
        favorite_food : "",
    });

    //inisialisasi state awal untuk searching dan search input
    const [searching, setSearching] = useState(false);
    const [statusInput, setStatusInput] = useState(false);

    //fungsi getData untuk mengambil data dari url
    const getData = async () => {
        const BASE_URL = "http://localhost:3030/DataPengunjung/query" || process.env.BASE_URL; //url fuseki

        const headers = {
            Accept: "application/sparql-results+json,*/*;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };

        //membuat varibel untuk menampung query get data
        const queryData = {
            query: `
            PREFIX people: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ab:     <http://data.pengunjung.com/pujasera/#>
            SELECT ?name ?age ?gender ?job ?institusi ?jurusan ?favorite_stall ?favorite_food
            WHERE
            {
                    ?id ab:name ?name ;
                        ab:age ?age ;
                        ab:gender ?gender ;
                        ab:job ?job ;
                        ab:institusi ?institusi ;
                        ab:jurusan ?jurusan ;
                        ab:favorite_stall ?favorite_stall ;
                        ab:favorite_food ?favorite_food .
                    
                    FILTER (
                    regex(?id, "${value.input}", "i") ||
                    regex(?name, "${value.input}", "i") ||
                    regex(?age, "${value.input}", "i") ||
                    regex(?gender, "${value.input}", "i") ||
                    regex(?job, "${value.input}", "i") ||
                    regex(?institusi, "${value.input}", "i") ||
                    regex(?jurusan, "${value.input}", "i") ||
                    regex(?favorite_stall, "${value.input}", "i") ||
                    regex(?favorite_food, "${value.input}", "i")
                    )
            }`,
        };

        setSearching(true);
        setStatusInput(true);
        document.getElementById('myInput').value = '';
        scrollToSection("codes");

        try {
            const { data } = await axios(BASE_URL, {
                method: "POST",
                headers,
                data: qs.stringify(queryData),
            });
            console.log(data);

            //convert data
            const formatted_data = data.results.bindings.map((code, index) => 
            formatter(code, index));
            console.log(formatted_data);

            setValue({
                ...value,
                codes: formatted_data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const getAllData = async () => {
        const BASE_URL = "http://localhost:3030/DataPengunjung/query"; //url fuseki

        const headers = {
            Accept: "application/sparql-results+json,*/*;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };

        //membuat varibel untuk menampung query get data
        const queryData = {
            query: `
            PREFIX people: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX ab:     <http://data.pengunjung.com/pujasera/#>
            SELECT ?name ?age ?gender ?job ?institusi ?jurusan ?favorite_stall ?favorite_food
            WHERE
            {
                    ?id ab:name ?name ;
                        ab:age ?age ; 
                        ab:gender ?gender ; 
                        ab:institusi ?institusi ; 
                        ab:jurusan ?jurusan ; 
                        ab:favorite_stall ?favorite_stall ; 
                        ab:favorite_food ?favorite_food ;
                        ab:job ?job .
            }ORDER BY ASC(?name)`,
        };

        setStatusInput(false);
        scrollToSection("codes");

        try {
            const { data } = await axios(BASE_URL, {
                method: "POST",
                headers,
                data: qs.stringify(queryData),
            });
            console.log(data);

            //convert data
            const formatted_data = data.results.bindings.map((code, index) => 
            formatter(code, index)
            );
            console.log(formatted_data);

            setValue({
                ...value,
                codes: formatted_data,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const formatter = (codes, index) => {
        return {
            id: index,
            name: codes.name.value,
            age: codes.age.value,
            gender: codes.gender.value,
            job: codes.job.value,
            institusi: codes.institusi.value,
            jurusan: codes.jurusan.value,
            favorite_stall: codes.favorite_stall.value,
            favorite_food: codes.favorite_food.value,
        };
    };

    const handleChange = (event) => {
        setValue({
        ...value,
        input: event.target.value,
        });
    };

    const content = value.codes.map((code) => (
        <Content 
            id={code.id}
            name={code.name}
            age={code.age}
            gender={code.gender}
            job={code.job}
            institusi={code.institusi}
            jurusan={code.jurusan}
            favorite_stall={code.favorite_stall}
            favorite_food={code.favorite_food}
        />
    ));
    return ( 
    <>
        <div className="large-container">
        <div className="container">
            <div className="home" id="home">
                <h1 className='title'>Data Pengunjung Pujasera Ciseke, Jatinangor</h1>
                <div className="search-wrapper">
                    <div className="search_box">
                        <input 
                        id='myInput'
                        type="text"
                        className="input"
                        placeholder="search..."
                        setvalue={value.input}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>
                    <div className="button-wrapper-get-all">
                        <button        
                        type="button"
                        value="Search"
                        onClick={getData} 
                        className='card-btn'>Search</button>
                        <button        
                        type="button"
                        value="Search"
                        onClick={getAllData} 
                        className='btn-get-all'>Get all data</button>
                        <Link to="/advanced" className='advSearch'>
                            <button className='btn-adv-src'>Advanced Search</button>
                        </Link>    
                    </div>
                </div>
            </div>
        </div>

            <div className="codes">
                <div className="container-data">
                    <div className="result-title-wrap">
                        <h1 className='result-title'>Search</h1>
                    </div>
                    <div>
                        {
                            (() => {
                                if(content.length === 0) {
                                    return (
                                        <div>
                                            {
                                                searching === false ? (
                                                    <>
                                                        <p className='warn'>Please enter a keyword</p>
                                                        <div className="img-wrap">
                                                            <img src={Img1} alt="" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="result-data">Keyword : "{value.input}"</h3>
                                                        <p className='warn'>Sorry, Invalid Input!</p>
                                                        <div className="img-wrap">
                                                            <img src={Img2} alt="" />
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    );
                                } else {
                                    return (
                                    <div>
                                        <h3 className="result2-data ">Result : {content.length} data</h3>
                                        {
                                        statusInput === true ?(<h3 className="result2-data ">Keyword : " {value.input} "</h3>
                                        ):(<></>)
                                        }
                                        
                                        {content}</div>);
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
    </div>
    <Footer />
    </>
    )
}

export default Home