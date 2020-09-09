const COLLECTION_ID = "5f58af75ad23b57ef90ecf4d";
const API_URL = "https://api.jsonbin.io/v3/b"; // todo: use API v2
window.API_KEY = localStorage.getItem("API_KEY");

// todo later: move common functionality from all CRUD functions to a single function

function create(binName, binData) { // todo: use await
  const options = {
    method: "POST", // todo: use instance methods
    headers: { // todo: use axios default headers
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Bin-Name": binName,
      "X-Master-Key": API_KEY
    },
    data: binData,
    url: API_URL // todo: use axios default base_url
  }
  return axios(options)
    .then(res => res.data) // todo: use axios interceptor to return the data
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`)); // todo: use axios interceptor to return create error message
}

function read(binId) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Master-Key": API_KEY
    },
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}
  
function update(binId, binData) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-COLLECTION-ID": COLLECTION_ID,
      "X-Master-Key": API_KEY
    },
    data: binData,
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}

function destroy(binId) {
  const options = {
    method: "DELETE",
    headers: {
      "X-Master-Key": API_KEY
    },
    url: `${API_URL}/${binId}`
  }
  return axios(options)
    .then(res => res.data)
    .catch(e => Promise.reject(`${e.message} : '${e.response.data.message}'`));
}
