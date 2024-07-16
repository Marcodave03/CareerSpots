import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import { AppDispatch } from "../app/store";
import axios from 'axios';
type JobProps = 
{
    jobTitle: any,
    companyName: any, 
    jobType: any, 
    jobLocation: any, 
    jobSalary: any,
    jobId: any, 
    staff_id: any,
    jobDescription: any,
    jobRequirement: any
}

const modal = () => {
  return (
      <div id="myModal" className="modal">
          <div className="modal-content">
              <span className="close">&times;</span>
              <p>Are you sure you want to apply?</p>
              <button></button>
          </div>
      </div>
  )
}

const JobDetail = (props: JobProps) => {
  const[login, setLogin] = useState<Boolean>(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isError, isSuccess, message, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    // console.log(isSuccess);
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      setLogin(false); 
    }
    // console.log(user); 
  }, [isError]);

  const createJobApplication = async(e:any) =>
  {
    // console.log(user);
    e.preventDefault(); 
    try
    {
      if(login)
      {
        // console.log(user.user_id); 
        await axios.post("http://localhost:5000/createjobapplication", 
          {
            user_id: user.user_id, 
            job_id: props.jobId
          }
        )
      }
      navigate("/portal"); 
    }
    catch(error:any)
    {
      if(error.response)
        {
          setMsg(error.response.data.msg);
        }
    }
  }
  return (
    
    <div className="card">
    <div className="card-header">
    <Link to={"/portal"} style={{ fontSize:"10px"}}> back</Link>
      <h1 style={{color:"#0062FF", fontSize:"24px", fontWeight:"bold"}}>{props.jobTitle}</h1>
      <button onClick={createJobApplication} style={{float:"right", marginRight:"5px", color:"white", backgroundColor:"#0062FF", 
      textDecoration:"none", border:"none", padding:"8px", fontSize:"12px", borderRadius:"5px"
      }}>Apply</button>
      <Link to={`/dashboard/message/compose/${props.staff_id}`} style={{float:"right", marginRight:"5px", color:"white", backgroundColor:"#0062FF", 
      textDecoration:"none", border:"none", padding:"8px", fontSize:"12px", borderRadius:"5px"
      }}>Send Message</Link>
      <p style={{marginTop: "-5px", fontSize:"14px"}}>{props.companyName}</p>
      <p style={{marginTop: "-15px", fontSize:"14px"}}>{props.jobLocation}</p>
      <hr/>
      <h2 style={{fontSize:"14px", fontWeight:"bold"}}>Job Type</h2>
      <p style={{display:"inline-block", fontSize:"12px", padding:"5px", backgroundColor:"#E1EBFB", color:"#0062FF"}}>{props.jobType}</p>
      <h2 style={{fontSize:"14px", fontWeight:"bold"}}>Salary</h2>
      <p style={{display:"inline-block",fontSize:"12px", padding:"5px", backgroundColor:"#E1EBFB", color:"#0062FF"}}>{props.jobSalary}</p>
    </div>
    <div className="card-body">
      <h2 style={{fontSize:"14px", fontWeight:"bold"}}>Job Description</h2>
      {props.jobDescription}
      <h2 style={{fontSize:"14px", fontWeight:"bold"}}>Requirements</h2>

        {props.jobRequirement}
    </div>
  </div>
  )
}

export default JobDetail;
