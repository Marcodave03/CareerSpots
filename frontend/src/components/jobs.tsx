import React from 'react';
import Logo from '../assets/Ellipse.png';
import {Link} from "react-router-dom";

type JobProps = 
{
    jobTitle: string,
    companyName: string, 
    jobType: string, 
    jobLocation: string, 
    jobSalary: number,
    jobId: number
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
                <div className='flex-start' style={{marginLeft:"10px", textAlign:"left"}}>
                    <h4 style={{fontWeight:"bold"}}>{props.jobTitle}</h4>
                </div>
                <div className='flex-start' style={{marginLeft:"10px"}}>
                    <p style={{textAlign:"left"}}>
                        {props.companyName}
                    </p>
                </div>
                <div className='m-2'>
                    <h5 className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"3px", textAlign:"left"}}>
                    <span className='text-primary' style={{padding:"3px", borderRadius:"5px", fontSize:"16px", backgroundColor:"#E1EBFB"}}>{props.jobType}</span>
                    </h5>
                    <h5 className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"3px", textAlign:"left"}}>
                    <span className='text-primary' style={{padding:"3px", borderRadius:"5px", fontSize:"16px", backgroundColor:"#E1EBFB"}}>{props.jobLocation}</span>
                    </h5>
                    <h5 className="bg-light text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa",padding:"3px", textAlign:"left"}}>
                    <span className='text-primary' style={{padding:"3px", borderRadius:"5px", fontSize:"16px", backgroundColor:"#E1EBFB"}}>{props.jobSalary}$</span>
                    </h5>
                </div>
                <div className='m-2'>
                    <Link to={"/jobdetail/" + props.jobId} className="btn bg-primary text-white flex-end m-1" style={{borderRadius:"40px", fontWeight: "bold", borderColor:"#f8f9fa"}}>
                    <span className='text-white'>Learn More</span>
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}

export default jobs
