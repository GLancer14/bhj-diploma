/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    Account.list(user, (err, response) => {
      if (err) {
        throw err;
      }

      if (response.success) {
        const transactionFormSelect = document.querySelector("#expense-accounts-list");
        const optionsHTML = response.data.reduce((acc, item) => {
          return acc += `<option value="${item.id}">${item.name}</option>`;
        }, "");
        transactionFormSelect.innerHTML = optionsHTML;
      } else {
        alert(response.error);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, function (err, response) {
      if (err) {
        throw err;
      }

      if (response.success) {
        const modal = this.element.closest(".modal");
        modal.element.querySelector("form").reset();
        App.update();
        modal.close();
      } else {
        alert(response.error);
      }
    });
  }
}