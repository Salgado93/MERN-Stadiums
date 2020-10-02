import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./StadiumForm.css";

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
  {
    id: "s2",
    title: "San Siro",
    description: "Stadium in Italy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Stadio_Meazza.jpg/1920px-Stadio_Meazza.jpg",
    address: "Piazzale Angelo Moratti, 20151 Milano MI, Italia",
    location: {
      lat: 45.4781236,
      lng: 9.1217733,
    },
    creator: "u2",
  },
];

const UpdateStadium = () => {
  const [isLoading, setIsLoading] = useState(true);
  const stadiumId = useParams().stadiumId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedStadium = DUMMY_STADIUMS.find((s) => s.id === stadiumId);

  useEffect(() => {
    if (identifiedStadium) {
      setFormData(
        {
          title: {
            value: identifiedStadium.title,
            isValid: true,
          },
          description: {
            value: identifiedStadium.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedStadium]);

  const stadiumUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedStadium) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find stadium!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="stadium-form" onSubmit={stadiumUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE STADIUM
      </Button>
    </form>
  );
};

export default UpdateStadium;
