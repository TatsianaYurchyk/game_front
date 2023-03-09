import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import styles from "../styles/Main.module.css";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

const Main = () => {
  const { NAME, ROOM } = FIELDS;

  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if (isDisabled) e.preventDefault();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>TIC TAC TOE</h1>

    <Form >
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
    <Form.Control type="text" 
     name="name"
     value={values[NAME]}
     placeholder="Enter Username"

     onChange={handleChange}
     autoComplete="off"
     required
    />
 </Form.Group>

 <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Room</Form.Label>
<Form.Control type="text" 
      name="room"
      placeholder="Enter Room Number "
      value={values[ROOM]}
    
      onChange={handleChange}
      autoComplete="off"
      required
    />
    </Form.Group>       

          <Link
            onClick={handleClick}
            to={`/game?name=${values[NAME]}&room=${values[ROOM]}`}
          >
              <Button  type="submit" className={styles.buttonr}>
        Join the game!
      </Button>
           
          </Link>

    </Form>
    </div>
    </div>

   
 
  );
};

export default Main;
