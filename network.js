function network({binId = "", bindName}, body, {...customConfig} = {}) {
  const API_URL = "https://api.jsonbin.io/v3/b"; // todo: use API v2
  const COLLECTION_ID = "5f1d6d37c58dc34bf5dafba4";
  const API_KEY = localStorage.getItem("API_KEY");

  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "X-COLLECTION-ID": COLLECTION_ID,
    "X-Master-Key": API_KEY,
    ...(bindName ? {"X-Bin-Name": binName} : {})
  };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body != null) {
    config.body = JSON.stringify(body);
  }

  return fetch(`${API_URL}/${binId}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        logout()
        window.location.assign(window.location)
        return
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(`${response.status} : '${data.message}'`);
      }
    });
}

network.put = (id, options) => network(id, {method: "PUT", ...options});
network.post = (id, options) => network(id, {method: "POST", ...options});
network.get = (id, options) => network(id, {method: "GET", ...options});
network.delete = (id, options) => network(id, {method: "DELETE", ...options});

function logout() {
  window.localStorage.removeItem("API_KEY");
}