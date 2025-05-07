/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, function (err, response) {
      if (err) {
        throw err;
      }

      if (response.success) {
        const modal = App.getModal("createAccount");
        modal.element.querySelector("form").reset();
        App.update();
        modal.close();
      } else {
        alert(response.error);
      }
    });
  }
}