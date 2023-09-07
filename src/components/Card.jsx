export default function Card({ card, onClickHandler }) {
  return (
    <div className="card" onClick={() => onClickHandler(card.id)}>
      <img src={card.img} draggable="false" />
      <p>{card.name}</p>
    </div>
  )
}