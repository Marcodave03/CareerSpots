import React from 'react';
import Logo from '../assets/Ellipse.png';

const jobs = () => {
  return (
    <div className="container">
        <div className="row justify-content-center">
            <div>
            <div className='jobs'>
                <div className="d-flex flex-column align-items-start bg-white p-4" style={{margin:"20px", borderRadius:"20px"}}>
                <div className='mb-3'>
                    <img className="image-fluid" src={Logo} style={{objectFit:"contain", width:60, height:"auto"}} id="" alt=""/>
                </div>
                <div className='flex-start' style={{marginLeft:"10px"}}>
                    <h4 style={{fontWeight:"bold"}}>Job Title</h4>
                </div>
                <div className='flex-start' style={{marginLeft:"10px"}}>
                    <p style={{textAlign:"left"}}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati commodi vero odio incidunt consequatur repellat nostrum nemo dolor ipsa ullam tenetur, officia eius numquam ratione, non placeat! A, culpa odit?
                    </p>
                </div>
                <div className='m-2'>
                    <button className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"10px"}}>
                    <span className='text-primary'>Full Time</span>
                    </button>
                    <button className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"10px"}}>
                    <span className='text-primary'>Min. 1 Year</span>
                    </button>
                </div>
                <div className='m-2'>
                    <button className="btn bg-primary flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa"}}>
                    <span className='text-white'>Save</span>
                    </button>
                    <button className="btn bg-primary text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa"}}>
                    <span className='text-white'>Learn More</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}

export default jobs
