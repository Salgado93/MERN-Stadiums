import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import {useHttpClient} from '../../shared/hooks/http-hook';
import { AuthContext } from "../../shared/context/auth-context";
import "./StadiumForm.css";



const UpdateStadium = () => {
  const auth = useContext(AuthContext);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedStadium,setLoadedStadium] = useState();
  const stadiumId = useParams().stadiumId;
  const history = useHistory();

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

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/stadiums/${stadiumId}`
        );
        setLoadedStadium(responseData.stadium);
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true,
            },
            description: {
              value: responseData.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        
      }

    };
    fetchStadium();
  },[sendRequest, stadiumId,setFormData]);

  const stadiumUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/stadiums/${stadiumId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/stadiums');
    } catch (err) {
      
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner/>
      </div>
    );
  }

  if (!loadedStadium && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find stadium!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {!isLoading && loadedStadium && (
        <form className="stadium-form" onSubmit={stadiumUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedStadium.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedStadium.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE STADIUM
          </Button>
        </form>
      )}
    </React.Fragment>
    
  );
};

export default UpdateStadium;
