export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      description: this._aboutElement.textContent,
    }
  }

  setUserInfo = ({name, description}) => {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = description;
  }
}