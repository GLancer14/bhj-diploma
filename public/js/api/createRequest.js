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
        const urlEncoded = new URL(url, "http://localhost:8000");
        if (data) {
          for (const [key, value] of Object.entries(data)) {
            urlEncoded.searchParams.append(key, value);
          }
        }

        xhr.open(method, urlEncoded);
        xhr.send();
      } else {
        let formData;
        if (data) {
          formData = new FormData();
          for (const prop of Object.entries(data)) {
            formData.append(prop[0], prop[1]);
          }
        }

        xhr.open(method, url);
        xhr.send(formData);
      }
    } catch (e) {
      callback(e);
    }
  
    xhr.addEventListener("load", function () {
      callback(null, this.response);
    });

    xhr.addEventListener("error", function () {
      callback(new Error("Request error"));
    });
  }
};
