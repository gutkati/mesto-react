import React from 'react';
import Card from './Card.js';
import { api } from "../utils/Api.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        api.getProfile()
    .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
    })
    .catch((err) => console.log(err))
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
    .then((res) => {
        const newCard = res.map((cardData) => {
            return {
                name: cardData.name,
                link: cardData.link,
                likes: cardData.likes,
                _id: cardData._id
            }
        })
        setCards(newCard);
        })

    .catch((err) => console.log(err))

    }, []);

    return (
        <main className="content page__content">

            <section className="profile">
                <div className="profile__container">
                    <div className="profile__container-avatar" onClick={onEditAvatar}>
                        <img src={userAvatar} alt="аватар" className="profile__avatar"/>
                    </div>

                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title">{userName}</h1>
                            <button aria-label="редактировать" type="button"
                                    className="profile__edit-button blackout" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button aria-label="добавить" type="button" className="profile__add-button blackout" onClick={onAddPlace}></button>
            </section>

                <section className="elements content__elements">
                    <ul className="element">
                        {
                        cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick}/>))
                    }
                    </ul>
                </section>
        </main>
    )
};

    export default Main;