import React from "react";
import { ListButton, StyledNavbar } from "./component.styled";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <StyledNavbar>
      <span>Navbar</span>
      <div>
        <ListButton>Movies to watch</ListButton>
        {user && (
          <Image
            src={user.profileImageUrl}
            alt="Profile picture"
            width={40}
            height={40}
          />
        )}
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
      </div>
    </StyledNavbar>
  );
};
