import React, {useEffect, useState} from "react";
import Header from './Header.js';
import Main from'./Main.js'
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards,setCards] = useState([]);



    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard(card);
    }

    function handleUpdateUser(info) {
        api.editProfile(info)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
        })
            .catch((err) => console.log(err));
    }

    function handleUpdateAvatar(object) {
        api.newAvatar(object)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(object) {
        api.addCard(object)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
        .catch((err) => console.log(err));
    }


    function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeStatusLike(card._id, !isLiked)
        .then((newCard) => {
        setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c)));
    })
        .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
    api.deleteCard(card._id)
        .then((res) => {
        setCards((state) =>
            state.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
    }

    useEffect(() => {
        api.getProfile()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));

        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
    }


  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <div className="page__container">
                <Header/>
                <Main onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardDelete={handleCardDelete}
                      onCardLike={handleCardLike}
                      cards={cards}
                />
                <Footer/>

            </div>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}/>

            {/*<PopupWithForm*/}
            {/*    name={'remove-card'}*/}
            {/*    title={'Вы уверены?'}*/}
            {/*    titleButton={'Да'}*/}
            {/*    isOpen={isImagePopupOpen}*/}
            {/*    onClose={closeAllPopups}/>*/}

            <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}/>

        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
