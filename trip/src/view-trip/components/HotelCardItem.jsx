import { GetPlaces } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const HotelCardItem = ({ hotel }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (hotel?.name) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const location = hotel?.name;
        try {
            const fetchedPhotos = await GetPlaces(location); 
            setPhotos(fetchedPhotos);
        } catch (error) {
            console.error('Error fetching place photos:', error);
        }
    };

    return (
        <div>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + ',' + hotel?.address} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                <img 
                src={photos.length > 0 ? photos[0].urls.full : '/travel.jpg'} 
                className='rounded-xl h-[180px] w-full object-cover' 
                alt={photos.length > 0 ? photos[0].alt_description : 'Travel'} 
            />
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.name}</h2>
                        <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                        <h2 className='text-sm'>💰{hotel?.price}</h2>
                        <h2 className='font-mediu'>⭐{hotel?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default HotelCardItem
