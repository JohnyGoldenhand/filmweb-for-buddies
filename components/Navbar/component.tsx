import React from "react";
import { ListButton, StyledNavbar } from "./component.styled";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { CenteredSection } from "~/styles/base.styled";
import Link from "next/link";

export const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const handleLinkClick = () => {
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };
  return (
    <StyledNavbar>
      <Link href="/" passHref legacyBehavior>
        <a onClick={handleLinkClick}>BuddiesFW</a>
        {/*want to reaload the page*/}
      </Link>
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
