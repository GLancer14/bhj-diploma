/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, function (err, response) {
      if (response.success) {
        const modal = App.getModal("register");
        App.getForm("register").element.reset();
        App.setState("user-logged");
        modal.close();
      } else {
        alert(response.error);
      }
    });
  }
}