import { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import Unauthorized from "./Unauthorized";

const Profile = ({loggedIn, setLoggedIn}) => {
  const [dataFromServer, setDataFromServer] = useState("Loading...");


  useEffect(() => {
    // her skal jeg tjekke for rollen og køre den rigitge fetch metode alt efter rollen
    let isLoggedIn = facade.loggedIn()
    if(isLoggedIn) {
      setLoggedIn(true)
      facade.fetchData().then((data) => {
        setDataFromServer(data)
        console.log(dataFromServer)
      });
    }
  }, []);

  return (
    <div>
        <>
        {!loggedIn ? <Unauthorized/> : 
        <><h1>Profile</h1>
          <h3>Data Received from server:</h3>
          <h3>Welcome Mr. {dataFromServer?.username}, {dataFromServer?.age}</h3>
          <h3>With ID: {dataFromServer?.id}</h3>
          <h3>You're currently signed in as: {dataFromServer?.roles}</h3>
          </>
        }
        </>
    </div>
  );
};

export default Profile;
