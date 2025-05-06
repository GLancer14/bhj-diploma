/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
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

        } else {
          callback();
        }
      },
    });
  }
}
