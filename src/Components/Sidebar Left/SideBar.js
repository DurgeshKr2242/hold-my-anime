import React from "react";
import FriendsSection from "./FriendsSection/FriendsSection";
import ProfileBanner from "./ProfileBanner/ProfileBanner";
import { useGlobalAuthContext } from "../../AuthContext";
const SideBar = () => {
  const { user } = useGlobalAuthContext();
  return (
    <>
      {user?.displayName ? (
        <>
          <ProfileBanner />
          <FriendsSection />
        </>
      ) : (
        <FriendsSection />
      )}
    </>
  );
};

export default SideBar;
