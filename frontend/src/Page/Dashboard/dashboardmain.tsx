import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './navdash';
import Footer from './footerdash';

const App: React.FC = () => {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Navbar />
                <div className="content">
                    <div className="container-fluid">
                        <div className="section">
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;
