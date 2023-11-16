const API_BASE_URL = "https://invoice-api-oi1n.onrender.com/api/v1";
export default function apiFetch(endpoint, fetchOptions) {
  if (!endpoint.startsWith("/")) {
    endpoint = "/" + endpoint;
  }
  let url = API_BASE_URL + endpoint;
  return fetch(url, fetchOptions);
}
