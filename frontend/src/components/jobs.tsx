import React from 'react';
import Logo from '../assets/Ellipse.png';

type JobProps = 
{
    jobTitle: string,
    companyName: string, 
    jobType: string, 
    jobLocation: string
}

const jobs = (props: JobProps) => {
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
                    <h4 style={{fontWeight:"bold"}}>{props.jobTitle}</h4>
                </div>
                <div className='flex-start' style={{marginLeft:"10px"}}>
                    <p style={{textAlign:"left"}}>
                        {props.companyName}
                    </p>
                </div>
                <div className='m-2'>
                    <button className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"10px"}}>
                    <span className='text-primary'>{props.jobType}</span>
                    </button>
                    <button className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"10px"}}>
                    <span className='text-primary'>{props.jobLocation}</span>
                    </button>
                </div>
                <div className='m-2'>
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
