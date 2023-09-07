"use client";

import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileLoader from "./ProfileLoader";

const isActiveStyle =
  "bg-highlight py-[7px] px-[16px] text-sm rounded-lg text-secondary";

type UserInfo = {
  email: string;
  username: string;
};
type link = {
  name: string;
  href: string;
};
interface navbarProps {
  user: UserInfo;
  navLinks: link[];
  isLoading: boolean;
}
const Navbar = ({ user, navLinks, isLoading }: navbarProps) => {
  const pathname = usePathname();

  const getLinkClassName = (isActive: boolean) => {
    return isActive ? isActiveStyle : "text-white text-sm py-[7px] px-[16px]";
  };

  return (
    <div className="container mx-auto flex justify-between py-5 px-2 md:px-28 flex-row items-center">
      <Link href="/">
        <p className="text-white text-[28px] font-[600]">
          Mockup<span className="text-primary">Wizard</span>
        </p>
      </Link>
      <div className="flex gap-4 flex-wrap items-center text-base justify-center">
        {user &&
          navLinks.map((link: link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.includes(link.href));
            const linkClassName = getLinkClassName(isActive);
            return (
              <Link href={link.href} key={link.name} className={linkClassName}>
                {link.name}
              </Link>
            );
          })}
      </div>
      {isLoading ? (
        <ProfileLoader />
      ) : user ? (
        <ProfileMenu email={user.email} username={user.username} />
      ) : (
        <div className="flex gap-6 items-center">
          <Link href="/sign-in" className="text-primary text-sm font-[700]">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="bg-white rounded-xl text-primary py-2 px-3 text-sm font-[700]"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
