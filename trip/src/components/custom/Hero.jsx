import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className='flex flex-col items-center gap-9 mx-56 '>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#359194]'>
                    Discover Your Next Adventure with AI:
                </span>
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-center text-xl text-gray-500'>
                Your personal trip planner and travel curator, creating custom itineraries for your interests and budget.
            </p>
            <Link to='/create-trip' className='mb-10'>
                <Button>
                    Get Started, It's Free
                </Button>
            </Link>
            <img src='/landing.jpg' alt='booking' className='-mt-10 h-[550px] w-[950px] object-cover -z-10 overflow-y-hidden' /> 
        </div>
    );
};

export default Hero;
