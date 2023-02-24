import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  
  const [tenzies, setTenzies] = React.useState(false)

  const [highScore, setHighScore] = React.useState(
    () => JSON.parse(localStorage.getItem("highScore")) || " "
  ) 
  const [points, setPoints] = React.useState(0)

  function generateNewDie(){
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }


  function allNewDice(){
    const newDice = []
    for(let i=1;i<=10;i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }


  function rollDice(){
    setPoints(point => point+1)
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld === true ?  
      die : 
      generateNewDie()
    }))
  }
  
  
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld : !die.isHeld } : die
    })
    )
  }
  
  
  React.useEffect(()=>{
    const allHeld = dice.every(die => {return die.isHeld})
    const allDiceSameValue = dice.every(die => {return die.value === dice[0].value})
    if(allHeld && allDiceSameValue){
      setTenzies(true)
      console.log("You Won !")
    }
  },[dice])
  
  
  function newGame(){
    setTenzies(false)
    setDice(allNewDice())
  }
  
  
  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      handleClick={()=>holdDice(die.id)}
    />
  ))
      
  React.useEffect(()=>{
    if(tenzies && highScore > points){
      localStorage.setItem("highScore", JSON.stringify(points))
      setHighScore(points)
    }
  },[tenzies])
      
  return (
    <main className="window">
      {tenzies && <Confetti />}
      <div className="title-block">
        <h1 className="title">{tenzies ?  "You Won!" : "Tenzies"}</h1>
        <p className={tenzies? "points" : "instructions"} >{tenzies ? `Your Points : ${points}` : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
        {highScore!==" " && <p className="highScore">HighScore : {highScore}</p>}
      </div>
      <div className="die-container">
        {diceElements}
      </div>
      <button className={`${ tenzies ? "new-game" : "roll-dice"}`} onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;