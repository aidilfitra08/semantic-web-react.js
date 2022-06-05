import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';
import Content from '../CardCompt';
import Img1 from "./../../assets/image/v1.png";
import Img2 from "./../../assets/image/v2.jpg";
import { Footer } from '../Footer';

//fungsi untul effect scroll
const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function FilterSearch() {
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
    const [searching, setSearching] = useState(false);

    const getDataByFilter = async () => {
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
                        ab:job ?job ; 
                        ab:institusi ?institusi ; 
                        ab:jurusan ?jurusan ; 
                        ab:favorite_stall ?favorite_stall ; 
                        ab:favorite_food ?favorite_food .
                    
                    FILTER contains(lcase(str(?age)), lcase(str("${
                      value.age ? value.age : ""
                    }")))
                    FILTER contains(lcase(str(?gender)), lcase(str("${
                      value.gender ? value.gender : ""
                    }")))
                    FILTER contains(lcase(str(?job)), lcase(str("${
                      value.job ? value.job : ""
                    }")))
                    FILTER contains(lcase(str(?institusi)), lcase(str("${
                      value.institusi ? value.institusi : ""
                    }")))
                    FILTER contains(lcase(str(?jurusan)), lcase(str("${
                      value.jurusan ? value.jurusan : ""
                    }")))
            } ORDER BY ASC (?name)`,
        };

        setSearching(true);
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
    const handleChangeAge = (event) => {
      setValue({
        ...value,
        age: event.target.value,
      });
    };
    const handleChangeGender = (event) => {
      setValue({
        ...value,
        gender: event.target.value,
      });
    };
    const handleChangeJob = (event) => {
      setValue({
        ...value,
        job: event.target.value,
      });
    };
    const handleChangeInstitusi = (event) => {
      setValue({
        ...value,
        institusi: event.target.value,
      });
    };
    const handleChangeJurusan = (event) => {
      setValue({
        ...value,
        jurusan: event.target.value,
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
    function showKeyword () {
      return([
        value.age !== "" ? (<h3 className='keyword-text'>Age : "{value.age}"</h3>):(<></>),
        value.gender !== "" ? (<h3 className='keyword-text'>Gender : "{value.gender}" </h3>):(<></>),
        value.job !== "" ? (<h3 className='keyword-text'>Job : "{value.job}" </h3>):(<></>),
        value.institusi !== "" ? (<h3 className='keyword-text'>Institusi : "{value.institusi}" </h3>):(<></>),
        value.jurusan !== "" ? (<h3 className='keyword-text'>Jurusan : "{value.jurusan}" </h3>):(<></>),
      ])
    }
  return (
    <>
      <div className="large-container">
        <div className="container">
            <div className="home" id="home">
                <h1 className='title'>Advanced search untuk Mengetahui Pengunjung Pujasera Ciseke, Jatinangor</h1>
                <div className="filterAdv">
                    <div className="grid">
                    <input                      
                    type="text"
                    className="inputFilter2"
                    placeholder='Age'
                    setValue={value.age}
                    onChange={handleChangeAge}/>
                    <select
                    className="dropdown-select"
                    setValue={value.gender}
                    onChange={handleChangeGender}
                    >
                      <option value="">Gender</option>
                      <option value="Laki-laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>

                    <select
                    className="dropdown-select"
                    setValue={value.job}
                    onChange={handleChangeJob}
                    >
                      <option value="">Job</option>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Siswa(SD)">SD</option>
                      <option value="Siswa(SMP)">SMP</option>
                      <option value="Siswa(SMA)">SMA</option>
                      <option value="Pekerja">Pekerja</option>
                    </select>

                    <input                      
                    type="text"
                    className="inputFilter2"
                    placeholder='Institusi'
                    setValue={value.institusi}
                    onChange={handleChangeInstitusi}/>

                    <input                      
                    type="text"
                    className="inputFilter2"
                    placeholder='Jurusan'
                    setValue={value.jurusan}
                    onChange={handleChangeJurusan}/>

                    </div>
                    <div className="button-wrapper-get-all">
                      <button        
                        type="button"
                        value="Search"
                        onClick={getDataByFilter} 
                        className='card-btn'>Search</button>
                      <Link to="/" className='advSearch'>
                            <button className='btn-adv-src'>Go to basic search</button>
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
                                                        <h3 className="result-data">Keyword : "Age: {value.age}, Gender: {value.gender}, Job: {value.job}, Institusi: {value.institusi}, Jurusan: {value.jurusan}"</h3>
                                                        <p className='warn'>Sorry, data not found!</p>
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
                                        <h3 className="result2-data ">Keyword : </h3>
                                        {showKeyword()}
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

export default FilterSearch