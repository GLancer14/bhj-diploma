/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.body;
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    sidebarToggle.addEventListener("click", () => {
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    document.querySelector(`.menu-item_login a`).addEventListener("click", function (e) {
      e.preventDefault();
      App.getModal("login").open();
    });
    document.querySelector(`.menu-item_register a`).addEventListener("click", function (e) {
      e.preventDefault();
      App.getModal("register").open();
    });
    document.querySelector(`.menu-item_logout a`).addEventListener("click", function (e) {
      e.preventDefault();
      User.logout(function(err, response) {
        if (response.success) {
          App.setState("init");
        }
      });
    });
  }
}