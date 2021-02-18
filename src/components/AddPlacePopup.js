import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function AddPlacePopup (props) {

  // * Стейт-переменные

  const [placeName, setPlaceName] = React.useState(''); // Название места
  const [placePic, setPlacePic] = React.useState(''); // Адрес иллюстрации места

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
  const [nameValidity, setNameValidity] = React.useState(true); // Состояние валидности инпута с названием
  const [picValidity, setPicValidity] = React.useState(true); // Состояние валидности инпута с адресом

  // * Функции

  // -- Обработчики формы

  function handlePlaceNameChange (evt) { // Изменение названия
    setPlaceName(evt.target.value);
  }

  function handlePlacePicChange (evt) { // Изменение адреса
    setPlacePic(evt.target.value);
  }

  function handleSubmit (evt) { // Сабмит
    evt.preventDefault();

    props.onAddPlaceSubmit({
      name: placeName,
      link: placePic
    });

    setPlaceName('');
    setPlacePic('');

    setNameValidity(true);
    setPicValidity(true);
    setFormValidity(false);
  }

  function handleClose () { // Закрытие
    props.onClose();

    setPlaceName('');
    setPlacePic('');

    setNameValidity(true);
    setPicValidity(true);
    setFormValidity(false);
  }

  // * Возвращаемое значение

  return (
    <PopupWithForm
      state={props.state}
      formValidityState={formValidity}
      onFormValidityChange={setFormValidity}
      name="card"
      heading="Новое место"
      onSubmit={handleSubmit}
      onClose={handleClose}
    >
      <Input
        inputModifier="popup__input_card-name"
        inputType="text"
        inputName="place"
        inputValue={placeName}
        inputPlaceholder="Название"
        inputMaxLength="30"
        inputValidityState={nameValidity}
        onInputValidityChange={setNameValidity}
        onValueChange={handlePlaceNameChange}
      />
      <Input
        inputModifier="popup__input_card-link"
        inputType="url"
        inputName="link"
        inputValue={placePic}
        inputPlaceholder="Ссылка на картинку"
        inputValidityState={picValidity}
        onInputValidityChange={setPicValidity}
        onValueChange={handlePlacePicChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;