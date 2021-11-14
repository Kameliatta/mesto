export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._name = null;
    this._about = null;
  }

  getUserInfo = () => {
    return {
      name: this._name,
      description: this._about,
    }
  }

  setUserInfo = ({name, description}) => {
    this._name = name;
    this._about = description;
  }

  updateUserInfo = () => {
    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;
  }
}