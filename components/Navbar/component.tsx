import React from "react";
import { ListButton, StyledNavbar } from "./component.styled";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { CenteredSection } from "~/styles/base.styled";

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <StyledNavbar>
      <span>Navbar</span>
      <CenteredSection>
        <ListButton>Movies to watch</ListButton>
        {user && (
          <Image
            src={user.profileImageUrl}
            alt="Profile picture"
            width={36}
            height={36}
          />
        )}
        {isSignedIn ? <SignOutButton /> : <SignInButton />}
      </CenteredSection>
    </StyledNavbar>
  );
};
