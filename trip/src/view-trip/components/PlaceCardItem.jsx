import { GetPlaces } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlaceCardItem = ({ activity }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if ( activity?.placeName) {
            GetPlacePhoto();
        }
    }, [activity]);

    const GetPlacePhoto = async () => {
        const location =  activity?.placeName; // Directly use the location string
        try {
            const fetchedPhotos = await GetPlaces(location); // Fetch photos based on location
            setPhotos(fetchedPhotos);
        } catch (error) {
            console.error('Error fetching place photos:', error);
        }
    };
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity?.placeName + ',' + activity?.placeDetails} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img 
                src={photos.length > 0 ? photos[0].urls.full : '/travel.jpg'} 
                className='rounded-xl h-[130px] w-[130px] object-cover' 
                alt={photos.length > 0 ? photos[0].alt_description : 'Travel'} 
            />
                <div>
                    <h2 className='font-bold text-lg'>{activity.placeName}</h2>
                    <p className='text-sm text-gray-500'>{activity.placeDetails}</p>
                    <h2 className='mt-2'>🕐{activity.timeTravel}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
