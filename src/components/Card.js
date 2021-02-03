function Card (props) {
  const cardData = props.item;
  cardData.alt = cardData.name;
  cardData.caption = `${cardData.alt} / © ${cardData.owner.name}`;

  function handleClick () {
    props.onCardClick(cardData);
  }

  return (
    <article className="card" key={props.i}>
      <button className="card__open-fullpic" type="button" onClick={handleClick}>
        <img className="card__image" src={cardData.link} alt={cardData.alt} />
      </button>
      <div className="card__label">
        <h2 className="card__name">{cardData.name}</h2>
        <button className="card__like" type="button">
          <p className="card__counter">{cardData.likes.length}</p>
        </button>
      </div>
    </article>
  );
}

export default Card;