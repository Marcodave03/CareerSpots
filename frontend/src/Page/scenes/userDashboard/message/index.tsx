import { useState, useEffect } from 'react';
import axios from "axios";
import ComposeMessage from "./ComposeMessage";
import InboxMessage from "./InboxMessage"; 
import ReadMessage from "./ReadMessage"; 
import SentMessage from "./SentMessage"; 
import ReadOnlyMessage from "./ReadOnlyMessage"; 
import '../../../Style/messagepage.css';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { getMe } from '../../../../features/authSlice';

const InterviewPage = () => {
    return (
        <div className="container mt-4">
            <div className="row messageNavigation-parent" style={{ textAlign: "center" }}>
                <div className="messagenav col-sm-6">
                    <Link to={"/dashboard/message/inbox"} style={{ textDecoration: "none" }}>inbox</Link>
                </div>
                <div className="messagenav col-sm-6">
                    <Link to={"/dashboard/message/sent"} style={{ textDecoration: "none" }}>sent</Link>
                </div>
            </div>
            <main className="message-content content">
                <Routes>
                    <Route path="/compose/:id" element={<ComposeMessage />} />
                    <Route path="inbox/*" element={<InboxMessage />}/>
                    <Route path="inbox/:id" element={<ReadMessage />}/>
                    <Route path="sent/*" element={<SentMessage />}/>
                    <Route path="sent/:id" element={<ReadOnlyMessage />}/>
                </Routes>
            </main>
        </div>
    )
}

export default InterviewPage