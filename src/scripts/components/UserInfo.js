export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      description: this._aboutElement.textContent,
    }
  }

  setUserInfo = ({name, description}) => {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (description) {
      this._aboutElement.textContent = description;
    }
  }
  
  setUserAvatar = ({avatar}) => {
    if(avatar){
      this._avatarElement.src = avatar;
    }
  }
}