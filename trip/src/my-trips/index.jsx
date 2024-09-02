import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate('/');
            return;
        }

        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        setTrips([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setTrips((prevTrips) => [...prevTrips, doc.data()]);

        });
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className='text-3xl font-bold'>
                My Trips
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 mt-10 gap-5'>

                {trips?.length > 0 ? trips.map((trip, index) => (
                    <UserTripCardItem key={index} trip={trip} />
                )) : [1, 2, 3, 4, 5,6].map((item, index) => (
                <div key={index} className="w-full h-[220px] bg-slate-200 animate-pulse rounded-xl"></div>
                ))
                
                }
            </div>
        </div>
    );
}

export default MyTrips;
