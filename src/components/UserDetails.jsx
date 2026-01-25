import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const UserDetails = useLoaderData();
  console.log(UserDetails);
  return <div>user details coming soon...</div>;
};

export default UserDetails;
