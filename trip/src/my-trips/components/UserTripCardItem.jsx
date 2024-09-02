
import { GetPlaces } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const UserTripCardItem = ({ trip }) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (trip && trip.userSelection?.location) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const location = trip.userSelection.location;
        try {
            const fetchedPhotos = await GetPlaces(location);
            setPhotos(fetchedPhotos);

        } catch (error) {
            console.error('Error fetching place photos:', error);
        }
    };
    return (
        <Link to={'/view-trip/' + trip.id}>
            <div className='hover:scale-105 transition-all'>
                <img
                    src={photos.length > 0 ? photos[0].urls.full : '/travel.jpg'}
                    className='object-cover rounded-xl h-[220px] '
                    alt={photos.length > 0 ? photos[0].alt_description : 'Travel'}
                />
                <h2 className='text-lg font-bold'>{trip?.userSelection?.location}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection?.days} Days with {trip?.userSelection?.budget} budget</h2>

            </div>
        </Link>
    )
}

export default UserTripCardItem
