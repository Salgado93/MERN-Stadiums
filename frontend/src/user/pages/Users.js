import React from "React";
import UserLists from "../components/UsersList";

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
  return <UserLists items={USERS} />;
};

export default Users;
