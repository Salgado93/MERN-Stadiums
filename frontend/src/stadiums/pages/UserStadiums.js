import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import StadiumList from "../components/StadiumList";
import {useHttpClient} from '../../shared/hooks/http-hook';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";



/*const DUMMY_STADIUMS = [
  {
    id: "s1",
    title: "Santiago Bernabeu",
    description: "Real Madrid's Stadium.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Estadio_Santiago_Bernab%C3%A9u_08.jpg/1280px-Estadio_Santiago_Bernab%C3%A9u_08.jpg",
    address: "Av. de Concha Espina, 1, 28036 Madrid, España",
    location: {
      lat: 40.4530387,
      lng: -3.6905224,
    },
    creator: "u1",
  },
];*/

const UserStadiums = () => {
  const [loadedStadiums, setLoadedStadiums] = useState();
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stadiums/user/${userId}`
          );
        setLoadedStadiums(responseData.stadiums);
      } catch (err) {
        
      }
    }
    fetchStadiums();
  },[sendRequest, userId]);

  const stadiumDeletedHandler = (deletedStadiumId) => {
    setLoadedStadiums(prevStadiums => prevStadiums.filter(stadium => stadium.id !== deletedStadiumId));
  }

  return(
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedStadiums && <StadiumList items={loadedStadiums} onDeleteStadium={stadiumDeletedHandler} />}
    </React.Fragment>
  ) 
};

export default UserStadiums;
