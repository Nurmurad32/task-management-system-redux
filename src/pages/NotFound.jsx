import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='h-[100vh] flex flex-col justify-center align-middle items-center'>
            <p className='text-2xl'>This page isn't available</p>
            <Link to="/">
                <button className="btn btn-primary mt-8">Go Back To Home Page</button>
            </Link>
        </div>
    );
};

export default NotFound;