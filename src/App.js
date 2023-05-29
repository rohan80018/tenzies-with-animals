import {useState, useEffect} from "react";
import Die from "./Die";
import bear from "./images/bear.png";
import cat from "./images/cat.png";
import dog from "./images/dog.png";
import crab from "./images/crab.png";
import spider from "./images/spider.png";
import owl from "./images/owl.png";
import octopus from "./images/octopus.png";
import star from "./images/star.png";
import piegeon from "./images/piegeon.png";
import jelly from "./images/jelly.png";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [dice, setDice] = useState(allNewDice);
    const [tenzies, setTenzies] = useState(false);
    const [count, setCount] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [score, setScore] = useState(localStorage.getItem('score')?JSON.parse(localStorage.getItem('score')): 0);

    useEffect(() => {
        const allDiceHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allDiceHeld && allSameValue) {
            let time = Date.now() - startTime;
            setTimeTaken(Math.round(time / 1000));
            setTenzies(true);
            if (timeTaken < score) {
                setScore(Math.round(timeTaken))
                localStorage.setItem('score',JSON.stringify(timeTaken));
            } else if (score === 0) {
                setScore(Math.round(timeTaken))
                localStorage.setItem('score',JSON.stringify(timeTaken));
            }
        }
    }, [dice,timeTaken]);

    function allNewDice() {
        let iconArray = [bear, cat, dog , crab, spider, owl, octopus, star, piegeon, jelly]
        // , cat,dog,crab,spider,owl,octopus,star,piegeon,jelly]
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: iconArray[Math.floor(Math.random() * iconArray.length)],
                isHeld: false,
                id: nanoid(),
            });
        }
        return newDice;
    }

    function rollDice() {
        if (!tenzies) {
            let iconArray = [bear, cat, dog , crab, spider, owl, octopus, star, piegeon, jelly]
            setCount(count + 1);
            setDice((oldDice) =>
                oldDice.map((die) => {
                return die.isHeld
                    ? die
                    : {
                        value: iconArray[Math.floor(Math.random() * iconArray.length)],
                        isHeld: false,
                        id: nanoid(),
                    };
                })
            );
        } else {
            setCount(0);
            setStartTime(0);
            setTenzies(false);
            setDice(allNewDice());
        }
    }

    function holdDice(id) {
        // console.log(count)
        if (count === 0 && startTime === 0) {
            setStartTime(Date.now());
        }
        setDice((oldDice) =>
        oldDice.map((die) => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
        );
        // console.log(startTime)
    }

    const diceElements = dice.map((die) => (
        <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        />
    ));
    // const timer = <span>{score}</span>
    return (
        <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies With Animals</h1>
        {tenzies ? (
            <p> Current Session Top Score <span style={{fontWeight:"600",fontSize:'24px'}}>{Math.round(score)}</span> sec</p>
        ) : (
            <p className="instruction">
            Roll until all animals are the same. Click each die to freeze it at
            its current value between rolls
            </p>
        )}
        <div className="dice-container">{diceElements}</div>
        {tenzies ? (<p>Time Taken <span style={{fontWeight:"600",fontSize:'24px'}}>{timeTaken}</span> sec</p>) : ""}
        <p>You have rolled <span style={{fontWeight:"600",fontSize:'24px'}}>{count}</span> times</p>
        <button className="roll-dice" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
        </button>
        </main>
    );
    }
