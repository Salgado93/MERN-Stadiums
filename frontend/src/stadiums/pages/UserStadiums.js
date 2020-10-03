import React from "react";
import { useParams } from "react-router-dom";

import StadiumList from "../components/StadiumList";

const DUMMY_STADIUMS = [
  {
    id: "s1",
    title: "Santiago Bernabeu",
    description: "Real Madrid Stadium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Estadio_Santiago_Bernab%C3%A9u_08.jpg/1280px-Estadio_Santiago_Bernab%C3%A9u_08.jpg",
    address: "Av. de Concha Espina, 1, 28036 Madrid, España",
    location: {
      lat: 40.4530387,
      lng: -3.6905224,
    },
    creator: "u1",
  },
];

const UserStadiums = () => {
  const userId = useParams().userId;
  const loadedStadiums = DUMMY_STADIUMS.filter(
    (stadium) => stadium.creator === userId
  );
  return <StadiumList items={loadedStadiums} />;
};

export default UserStadiums;
