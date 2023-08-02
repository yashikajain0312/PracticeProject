import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

function AddUser(props) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
 
    if (username.trim().length === 0 || age.trim().length === 0) {
        setError({
            title: "Invalid input",
            message: "Please enter a valid name and age (non-empty values)."
        })    
        return;
    }
    if (+age < 1) {
        setError({
            title: "Invalid age",
            message: "Please enter a valid age (> 0)."
        }) 
    return;
    }

    props.onAddUser(username, age);
    setUsername("");
    setAge("");
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <div>
        {error &&  <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>
}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Button type="submit">
          <span>Add User</span>
        </Button>
      </form>
    </Card>
    </div>
  );
}

export default AddUser;
