import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className='text-lg font-bold'>Places To Visit</h2>
            {trip?.tripData?.itinerary?.map((dayPlan, index) => (
                <div key={index} className='my-4'>
                    <h2 className='text-lg font-medium'>Day : {dayPlan.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                        {dayPlan.schedule.map((activity, idx) => (
                            <div key={idx} className='mt-5'>
                                <h2 className='text-sm font-medium text-orange-600'>{activity.time}</h2>
                                <PlaceCardItem activity={activity} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlacesToVisit;
