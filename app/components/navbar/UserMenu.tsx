"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
interface UserMenuProps {
  currentUser?: SafeUser | null,
}

const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);


  const onRent = useCallback(() => {
    if(!currentUser){
       return loginModal.onOpen();
    }

    //Open modal of Rent
    rentModal.onOpen();

  }, [currentUser,loginModal,rentModal]);


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          NestQuest your home away from home!!
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white  overflow-hidden top-12 right-0 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser?(
              <>
              <MenuItems onClick={()=>{}} label="My Trips" />
              <MenuItems onClick={()=>{}} label="Favourites" />
              <MenuItems onClick={()=>{}} label="My Reservations" />
              <MenuItems onClick={()=>{}} label="Owned Properties" />
              <MenuItems onClick={() => rentModal.onOpen()} label="NestQuest my Home" />
              <hr />
              <MenuItems onClick={()=>signOut()} label="Log Out" />
              </>
            ):(
              <>
                <MenuItems onClick={loginModal.onOpen} label="Login" />
                <MenuItems onClick={registerModal.onOpen} label="SignUp" />
              </>
          )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
