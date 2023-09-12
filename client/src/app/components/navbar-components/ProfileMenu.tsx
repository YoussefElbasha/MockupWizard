import React, { useState } from "react";
import ArrowDown from "@/app/icons/arrow-down.svg";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/outline";
import api from "../../../../util/Axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

interface profileMenuProps {
  email: string;
  username: string;
  picture: string;
}

function ProfileMenu(props: profileMenuProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignout = async () => {
    await api.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    toast.success("Logged out.");
    mutate("user-info");
    router.replace("/");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-4 p-2 rounded-full"
        >
          <div>
            <img
              className="w-10 rounded-full"
              src={props.picture ?? "/pepeWizard.png"}
            />
          </div>
          <div className="flex flex-col font-[500] text-sm text-left">
            <p className="text-white">{props.username}</p>
            <p className="text-[#CFD1D4]">{props.email}</p>
          </div>
          <ArrowDown
            className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-4">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={label === "Sign Out" ? handleSignout : closeMenu}
              className={`flex items-center text-black hover:bg-gray-200 gap-2 rounded p-2 ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
export default ProfileMenu;
