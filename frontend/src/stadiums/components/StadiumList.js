import React from "react";
import Card from "../../shared/components/UIElements/Card";
import StadiumItem from "./StadiumItem";
import Button from "../../shared/components/FormElements/Button";
import "./StadiumList.css";

const StadiumList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="stadium-list center">
        <Card>
          <h2>No stadiums found. Create one.</h2>
          <Button to="/stadiums/new">Share Stadium</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="stadium-list">
      {props.items.map((stadium) => (
        <StadiumItem
          key={stadium.id}
          id={stadium.id}
          image={stadium.imageUrl}
          title={stadium.title}
          description={stadium.description}
          address={stadium.address}
          creatorId={stadium.creator}
          coordinates={stadium.location}
        />
      ))}
    </ul>
  );
};

export default StadiumList;
