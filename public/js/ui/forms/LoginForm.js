/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, function (err, response) {
      if (err) {
        throw err;
      }

      if (response.success) {
        const modal = App.getModal("login");
        modal.element.querySelector("form").reset();
        App.setState("user-logged");
        modal.close();
      } else {
        alert(response.error);
      }
    });
  }
}