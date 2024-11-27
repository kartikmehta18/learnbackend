import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])
  useEffect(() => {

    // in this we got cores error so we use vite.config.js file to solve this error proxy define / npm corse in backend
    axios.get("/api/jokes")
      .then((response) => {
        console.log(response.data);
        setJokes(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  // const getJokes = async () => {
  //   const response = await fetch("http://localhost:3000/jokes")
  //   const data = await response.json();
  //   console.log(data);
  //   setJokes(data);

  // }
  // getJokes();

  return (
    <><h1> get jokes</h1>
      <p>jokes: {jokes.length}</p>

      {
        jokes.map((joke, index) => {
        return(
          <div key={index}>
          <p>jokes id : {joke.id}</p>
          <p>jokes: {joke.content}</p>
        </div>
        );
        })
      }
    </>
  )
}

export default App
