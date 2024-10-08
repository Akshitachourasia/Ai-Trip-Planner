import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/services/AIModal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const CreateTrip = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedlocation, setSelectedlocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
        onError: (error) => console.log(error)
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.days > 15 && !formData.location || !formData?.budget || !formData?.travel) {
            toast("Please fill all the fields", { type: "warning" });
            return;
        }

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location).replace("{budget}", formData.budget).replace("{travel}", formData.travel).replace("{days}", formData.days);
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log(result?.response?.text(), "RESULT");
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: "application/json"
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem("user", JSON.stringify(res.data));
            setOpenDialog(false);
            onGenerateTrip();
        })
    }

    const fetchLocationSuggestions = async (query) => {
        if (!query) return;
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: query,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5
                }
            });
            setLocationSuggestions(response.data.map(location => ({
                label: location.display_name,
                value: location.display_name
            })));
        } catch (error) {
            console.error("Error fetching location suggestions", error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchLocationSuggestions(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>
            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className='font-medium my-3 text-xl'>
                        What is the location of your choice?
                    </h2>
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {locationSuggestions.length > 0 && (
                        <ul className="border rounded-lg mt-2">
                            {locationSuggestions.map((location) => (
                                <li
                                    key={location.value}
                                    onClick={() => {
                                        setSearchTerm(location.label); 
                                        handleInputChange('location', location.label); 
                                        setLocationSuggestions([]); 
                                    }}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                    {location.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h2 className='font-medium my-3 text-xl'>
                        How many days are you planning for your trip?
                    </h2>
                    <Input type="number" placeholder="Ex: 3"
                        onChange={(e) => handleInputChange('days', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <h2 className='font-medium my-3 text-xl'>What is your budget?</h2>
                <p>The budget is exclusively allocated for activities and dining purposes.</p>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-sm
              ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='font-medium my-3 text-xl'>Who do you plan on travelling with on your next adventure?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelsList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('travel', item.people)}
                            className={`p-4 border cursor-pointer rounded-lg hover:shadow-sm
              ${formData?.travel == item.people && 'shadow-lg border-black'}
              `}
                        >
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-end mt-10'>
                <Button
                    disabled={loading}
                    onClick={onGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' /> : 'Generate Trip'
                    }
                </Button>
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription>
                            <img src='/logo.svg' />
                            <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                            <p>Sign in to the App with Google authentication securely.</p>
                            <Button
                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center">
                                <FcGoogle className='w-7 h-7' />
                                Sign in with Google
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default CreateTrip