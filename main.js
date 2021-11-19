(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._cardSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._image=this._element.querySelector(".element__image"),this._image.src=this._link,this._image.alt="Изображение ".concat(this._name),this._element.querySelector(".element__container-text").textContent=this._name,this._element}},{key:"_addLike",value:function(){this._element.querySelector(".element__like-button").classList.toggle("active")}},{key:"_removeCard",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._element.querySelector(".element__like-button").addEventListener("click",(function(){e._addLike()})),this._element.querySelector(".element__delete-button").addEventListener("click",(function(){e._removeCard()}))}}])&&e(n.prototype,r),t}();function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=function e(t,r){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),n(this,"_setEventListeners",(function(){o._inputList.forEach((function(e){e.addEventListener("input",(function(){o._checkInputValidity(o._formElement,e,o._settings),o.toggleButtonState(o._submitButton,o._inputList,o._settings)}))})),o._formElement.addEventListener("submit",(function(e){e.preventDefault()}))})),n(this,"_isFormInvalid",(function(){return o._inputList.some((function(e){return!e.validity.valid}))})),n(this,"toggleButtonState",(function(){o._isFormInvalid()?(o._submitButton.classList.add(o._settings.inactiveButtonClass),o._submitButton.setAttribute("disabled",!0)):(o._submitButton.classList.remove(o._settings.inactiveButtonClass),o._submitButton.removeAttribute("disabled"))})),n(this,"_showInputError",(function(e,t){e.textContent=t.validationMessage,t.classList.add(o._settings.errorClass)})),n(this,"_hideInputError",(function(e,t){e.textContent="",t.classList.remove(o._settings.errorClass)})),n(this,"_checkInputValidity",(function(e,t){var n=!t.validity.valid,r=e.querySelector("#".concat(t.id,"-error"));n?o._showInputError(r,t):o._hideInputError(r,t)})),n(this,"clearForm",(function(){o._inputList.forEach((function(e){var t=o._formElement.querySelector("#".concat(e.id,"-error"));o._hideInputError(t,e)}))})),n(this,"enableValidation",(function(){o._setEventListeners(o._formElement,o._settings)})),this._settings=t,this._formElement=document.querySelector(r),this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._submitButton=this._formElement.querySelector(this._settings.submitButtonSelector)},o={formSelector:".popup__container",inputSelector:".popup__info",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",errorClass:"popup__info-error"};function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&i(t.prototype,n),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){var n,r,o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=function(e){"Escape"===e.key&&o.close()},(n="_handleEscClose")in this?Object.defineProperty(this,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):this[n]=r,this._popupElement=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.querySelector(".popup__close-button").addEventListener("click",(function(){return e.close()})),this._popupElement.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&e.close()}))}}])&&c(t.prototype,n),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},f.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function d(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var y=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._popupMainImage=document.querySelector("#big-image"),t._popupSubtitle=document.querySelector("#image-text"),t}return t=u,(n=[{key:"open",value:function(e,t){this._popupMainImage.src=t,this._popupSubtitle.textContent=e,f(_(u.prototype),"open",this).call(this)}}])&&l(t.prototype,n),u}(s);function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function E(e,t){return E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},E(e,t)}function S(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._popupSubmit=t,n._formElement=n._popupElement.querySelector(".popup__container"),n._inputList=n._popupElement.querySelectorAll(".popup__info"),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){b(k(u.prototype),"close",this).call(this),this._formElement.reset()}},{key:"setEventListeners",value:function(){var e=this;b(k(u.prototype),"setEventListeners",this).call(this),this._formElement.addEventListener("submit",(function(){e._popupSubmit(e._getInputValues())}))}}])&&v(t.prototype,n),u}(s);function L(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=document.querySelector(".profile__edit-button"),j=document.querySelector(".profile__add-button"),C=document.querySelector("#name"),q=document.querySelector("#description"),I=new r(o,"#edit-container");I.enableValidation();var P=new r(o,"#add-container");P.enableValidation();var x=new y("#open-image"),B=new w("#add",(function(e){A(e),B.close()})),R=new w("#edit",(function(){T.setUserInfo({name:C.value,description:q.value}),R.close()})),T=new function e(t){var n=this,r=t.nameSelector,o=t.aboutSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),L(this,"getUserInfo",(function(){return{name:n._nameElement.textContent,description:n._aboutElement.textContent}})),L(this,"setUserInfo",(function(e){var t=e.name,r=e.description;n._nameElement.textContent=t,n._aboutElement.textContent=r})),this._nameElement=document.querySelector(r),this._aboutElement=document.querySelector(o)}({nameSelector:".profile__name",aboutSelector:".profile__text"}),V=new u({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){return A(e)}},".elements");function A(e){V.addItem(function(e){return new t(e,".element-container_template",D).generateCard()}(e))}function D(e,t){x.open(e,t)}O.addEventListener("click",(function(){var e;I.clearForm(),e=T.getUserInfo(),C.value=e.name,q.value=e.description,R.open()})),j.addEventListener("click",(function(){P.clearForm(),P.toggleButtonState(!1),B.open()})),R.setEventListeners(),B.setEventListeners(),x.setEventListeners(),T.setUserInfo({name:"Жак-Ив Кусто",description:"Исследователь океана"}),V.renderItems()})();