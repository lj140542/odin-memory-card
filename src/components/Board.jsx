import Card from "./Card";
import { useEffect, useState } from "react";

let status = 'pending';
let result;

const url = 'https://pokeapi.co/api/v2/pokemon/';
const numberOfCard = 3;

export default function Board({ increaseScore, gameOver }) {
  const [cards, setCards] = useState(fetchCards());
  const [cardsPlayed, setCardsPlayed] = useState([]);

  const handleTurnPlayed = (key) => {
    if (cardsPlayed.findIndex(id => id === key) !== -1) gameOver(false); // game lose
    else {
      increaseScore();
      setCardsPlayed([...cardsPlayed, key])
      shuffleBoard();
    }
  }

  const shuffleBoard = () => {
    let array = [...cards];
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    setCards(array);
  }

  useEffect(() => {
    if (cardsPlayed.length === numberOfCard) gameOver(true);
  });

  return (
    <div className="board">
      {cards.map(card => <Card key={card.id} card={card} onClickHandler={handleTurnPlayed} />)}
    </div>
  )
}

function fetchCards() {
  let idArr = [];
  for (let i = 1; i <= numberOfCard; i++) {
    let id = Math.floor(Math.random() * 721 + 1);
    while (idArr.findIndex((arrValue) => arrValue === id) !== -1)
      id = Math.floor(Math.random() * 721 + 1);
    idArr.push(id);
  }

  let fetching = Promise.all(idArr.map((id) => {
    return fetch(`${url}${id}/`)
      .then((response) => response.json())
  }))
    .then((response) => {
      status = 'fulfilled';
      result = response.map((data, index) => {
        return { id: index, name: data.name, img: data.sprites.front_default }
      });
    })
    .catch((error) => {
      status = 'rejected';
      result = error;
    })

  return () => {
    if (status === "pending") {
      throw fetching; // Suspend(A way to tell React data is still fetching)
    } else if (status === "rejected") {
      throw result; // Result is an error
    } else if (status === "fulfilled") {
      return result; // Result is a fulfilled promise
    }
  };
}
