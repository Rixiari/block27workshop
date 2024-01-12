import { useState } from "react";

export default function SignUpForm({setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    // Add your validation logic here (e.g., length check)
    if (newUsername.length < 5) {
      setError("Username must be at least 5 characters long");
    } else {
      setError(null);
    }
    setUsername(newUsername);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username,password }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        // If the response is successful, display the username
        const userData = result.data;
        console.log("Logged-in username:", userData.username);

        // Set the token in the state
        setToken(result.token);
      } else {
        // If there's an error, set the error message in the state
        setError(result.message || "An error occurred during signup");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3M…4NzN9.Bmpqbm6ESv1Zr5HeNSGNCHGsSn9ujIUBWkW50rKA-8k'

  return (
    <div id="signup">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
