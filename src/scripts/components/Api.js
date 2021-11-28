export default class Api {
  constructor(config, renderInfo) {
    this._url = config.url;
    this._headers = config.headers;
    this._method = config.method;
    this._renderInfo = renderInfo;
  }

  getUserInfo() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getCardsInfo() {
    return fetch(this._url, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((result) => {
        return result
      })
  }

  setNewData(data) {
    return fetch(this._url, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  clickLike(cardId) {
    return fetch(this._url + `${cardId}`, {
      method: this._method,
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  deleteCard(cardId) {
    return fetch(this._url + `${cardId}`, {
      method: this._method,
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}