import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Daniel Salgado",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/athlete-taking-a-break-royalty-free-image-675579770-1545996779.jpg",
      stadiums: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
