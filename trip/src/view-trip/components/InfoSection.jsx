import { Button } from '@/components/ui/button';
import { GetPlaces } from '@/services/GlobalApi'; // Only import GetPlaces
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (trip && trip.userSelection?.location) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const location = trip.userSelection.location;
        try {
            const fetchedPhotos = await GetPlaces(location); // Fetch photos based on location
            setPhotos(fetchedPhotos);
        
        } catch (error) {
            console.error('Error fetching place photos:', error);
        }
    };

    return (
        <div>
            <img 
                src={photos.length > 0 ? photos[0].urls.full : '/travel.jpg'} 
                className='h-[600px] w-full object-cover rounded-xl' 
                alt={photos.length > 0 ? photos[0].alt_description : 'Travel'} 
            />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='text-2xl font-bold'>{trip?.userSelection?.location}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅 {trip?.userSelection?.days} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'> 🧳 No. of Travellers: {trip?.userSelection?.travel} </h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    );
}

export default InfoSection;
