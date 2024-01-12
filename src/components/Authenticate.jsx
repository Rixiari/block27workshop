import { useState } from "react";

export default function Authenticate({token}) {
const [error, setError] = useState(null);
const [successMessage, setsuccessMessage] =useState(null);

  async function handleClick (event){
    event.preventDefault();
  try { 
    const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",{
      method: "GET",
      headers:{"Content-Type": "application/json", Authorization: `Bearer ${token}` }
    });
    const result = await response.json();
    setsuccessMessage(result.message);
  } catch (error){
    setError(error.message);
  }
  }
    return (
      <div id="authenticate">
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}> Authenticate Token </button>
      </div>
    );
  }