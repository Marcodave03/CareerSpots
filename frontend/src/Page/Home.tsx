import React from 'react';
import Navbar from "../components/navbar.tsx";
import Jobs from "../components/jobs.tsx";
import '../Style/main.css';
import img from '../assets/Vector.png'

const Home = () => {
  return (
    <div className='Home bg-body-secondary'>
      <Navbar/>
      <div className='container d-flex justify-content-center' style={{marginTop:"50px"}}>
        <div className='row'>
          <div className="col text-center">
            <div style={{marginBottom:"25px"}}>
            <h2 className="typing-text"><span>We'll get you </span><span className='text-primary'>hired</span></h2>
            <h2 className="typing-text"><span>hired in </span><span className='text-primary'>no time</span></h2>

            </div>
            <div className="div">
              <p className='mb-3'>Find job easy now !</p>
              <form className="d-flex" role="search">
                <div className="form-control me-2 d-flex justify-content-between" style={{borderRadius:"40px", alignItems:"center"}}>
                  <p style={{marginLeft:"20px"}}>Search Job Title </p>          
                  <button className="btn btn-outline-success bg-primary text-white flex-end" style={{borderRadius:"40px"}} type="submit">Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div style={{marginTop:"20px", marginBottom:"50px"}}>
              <div className="row logos">
                <div className="logos-slide">
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                </div>
                <div className="logos-slide">
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                  <img className="image-fluid" src={img}  style={{objectFit:"contain", width:200,height:"auto"}} id="" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col text-center">
            <h2>Available <span className='text-primary'>Jobs</span></h2>
            <div className="d-flex flex-wrap justify-content-center mt-4">
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
              <div className="col col-md-5 col-lg-4"><Jobs /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
