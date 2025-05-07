/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = "/account";
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: this.URL,
      data: {id},
      method: "GET",
      callback: function (err, response) {
        if (err) {
          callback(err)
        } else {
          callback(null, response);
        }
      },
    });
  }
}
