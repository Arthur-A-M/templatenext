import getConfig from "next/config";

import { mapService } from "@/services/mapService";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url) {
  const requestOptions = {
    method: "GET",
  };

  try {
    return fetch(url, requestOptions).then(handleResponse);
  } catch (error) {}
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  };

  try {
    return fetch(url, requestOptions).then(handleResponse);
  } catch (error) {}
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    return fetch(url, requestOptions).then(handleResponse);
  } catch (error) {}
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
  };

  try {
    return fetch(url, requestOptions).then(handleResponse);
  } catch (error) {}
}
