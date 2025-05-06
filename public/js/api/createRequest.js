/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (Object.keys(options).length > 0) {
    const {url, data, method, callback} = options;
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    try {
      if (method === "GET") {
        const urlEncoded = new URL(url);
        for (const prop of Object.entities(data)) {
          urlEncoded.searchParams.append(prop[0], prop[1]);
        }
        xhr.open(method, urlEncoded);
        xhr.send();
      } else if (method === "POST") {
        const formData = new FormData();
        for (const prop of Object.entities(data)) {
          formData.append(prop[0], prop[1]);
        }
        xhr.open(method, url);
        xhr.send(formData);
      }
    } catch (e) {
      callback(new Error(xhr.statusText));
    }
  
    xhr.addEventListener("load", function () {
      callback(null, JSON.parse(this.response));
    });
  
    xhr.addEventListener("error", function () {
      callback(new Error(this.statusText));
    });
  }
};
