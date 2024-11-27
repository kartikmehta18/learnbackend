import { useState } from 'react'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])

  const getJokes = async () => {
    const response = await fetch("http://localhost:3000/jokes")
    const data = await response.json();
    console.log(data);
    setJokes(data);
   
  }
  // getJokes();

  return (
    <><h1> get jokes</h1>
      <p>jokes: {jokes.length}</p>

      {
        jokes.map((jokes, index) => {
          <div key={index}>
            <p>jokes id : {jokes.id}</p>
            <p>jokes: {jokes.content}</p>
          </div>
        })
      }
    </>
  )
}

export default App
