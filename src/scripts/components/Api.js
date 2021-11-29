export default class Api {
  constructor(config, renderInfo) {
    this._url = config.url;
    this._headers = config.headers;
    this._renderInfo = renderInfo;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._url + `users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getCardsInfo() {
    return fetch(this._url + `cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
      .then((result) => {
        return result
      })
  }

  setNewData(data, method, urlData) {
    return fetch(this._url + `${urlData}`, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  clickLike(cardId, method, urlData) {
    return fetch(this._url + urlData + `${cardId}`, {
      method: method,
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  deleteCard(cardId, method, urlData) {
    return fetch(this._url + urlData + `${cardId}`, {
      method: method,
      headers: this._headers
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}