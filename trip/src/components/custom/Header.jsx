import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogClose } from '../ui/dialog';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json",
      },
    }).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);


    return (
      <div className="p-2 shadow-sm flex justify-between items-center px-5">
        <img src="../logo.svg" />
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  + Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user.picture} className="w-[35px] h-[35px] rounded-full" />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.href = '/';
                    }}
                    className="cursor-pointer"
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
          )}
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="visually-hidden"></DialogTitle>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in to the App with Google authentication securely.</p>
                <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                  <FcGoogle className="w-7 h-7" />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default Header;
