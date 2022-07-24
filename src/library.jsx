import produce, { freeze } from "immer";
import React from 'react';

export function useImmer(initialValue) {
  const [val, updateValue] = React.useState(() =>
    freeze(
      typeof initialValue === "function" ? initialValue() : initialValue,
      true
    )
  );
  return [
    val,
    (updater => {
      if (typeof updater === "function") updateValue(produce(updater));
      else updateValue(freeze(updater));
    }),
  ];
}

export var session = JSON.parse(localStorage.session || "null") || {login_key: {}}

export var API_BASE_URL = ""

export function setApiBaseUrl(url) { API_BASE_URL = url; }

export function api(api_url, input, callback, failure_callback) {
  input = input || {}
  input.session = session
  if (api_url.length > 0 && api_url[0] === '/') {
    api_url = API_BASE_URL + api_url
  }
  fetch(api_url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(input)
  })
  .then(response => response.json())
  .then(function(backend_output) {
    session = backend_output.session || session
    localStorage.session = JSON.stringify(session)
    callback && callback(backend_output.data)
  })
  .catch(function(error) {
    console.log(error)
    failure_callback && failure_callback(error);
  })
}
