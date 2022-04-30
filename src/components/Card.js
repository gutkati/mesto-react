//import React from "react";

import React from "react";

export default function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="element__item" key={props.card.id} >
            <button aria-label="удалить" type="button" className="element__delete blackout" onClick={handleClick}></button>
            <img src={props.card.link} alt={props.card.name} className="element__image"/>
                <div className="element__container">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__section-like">
                        <button aria-label="нравится" type="button" className="element__like"></button>
                        <span className="element__like-number">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>

    )
}

