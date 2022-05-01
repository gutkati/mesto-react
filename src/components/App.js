import React from "react";
import Header from './Header.js';
import Main from'./Main.js'
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({})

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

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
    }

  return (
    <div className="page">
        <div className="page__container">
            <Header/>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
            <Footer/>

        </div>

            <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name={'profile'} title={'Редактировать профиль'} titleButton={'Сохранить'}>
            <div className="popup__input-container">
                <input type="text" name="name" placeholder="Имя" minLength="2" maxLength="40"
                       required className="popup__input popup__input_theme_name" id="profile-name-input"/>
                       <span className="profile-name-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container">
                <input type="text" name="about" placeholder="О себе" minLength="2"
                       maxLength="200" required className="popup__input popup__input_theme_about-me" id="profile-about-me-input"/>
                    <span className="profile-about-me-input-error popup__input-error"></span>
            </div>
            </PopupWithForm>

            <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name={'profile-avatar'} title={'Обновить аватар'} titleButton={'Сохранить'}>
                <div className="popup__input-container">
                    <input type="url" name="avatar" placeholder="Ссылка на аватар" required
                           className="popup__input popup__input_theme_name" id="avatar-link-input"/>
                        <span className="avatar-link-input-error popup__input-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name={'card'} title={'Новое место'} titleButton={'Создать'}>
                <div className="popup__input-container">
                    <input type="text" name="name" placeholder="Название" minLength="2"
                           maxLength="30" required className="popup__input popup__input_type_card-name" id="card-name-input"/>
                        <span className="card-name-input-error popup__input-error"></span>
                </div>
                <div className="popup__input-container">
                    <input type="url" name="link" placeholder="Ссылка на картинку" required
                           className="popup__input popup__input_type_card-link" id="card-link-input"/>
                        <span className="card-link-input-error popup__input-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm name={'remove-card'} title={'Вы уверены?'} titleButton={'Да'} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>

            <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>


</div>
  );
}

export default App;
