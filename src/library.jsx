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

export var API_BASE_URL = ""

export function setApiBaseUrl(url) { API_BASE_URL = url; }

function loadSession() {
  return JSON.parse(localStorage.session || "null") || {login_key: {}};
}

var g_session = loadSession();

export const SessionContext = React.createContext()

export function SessionProvider({children, defaultGlobalState}) {
  const [session, setSession] = React.useState(loadSession())
  const setSessionWrapper = function(value) {
    setSession(value)
    localStorage.session = JSON.stringify(value || g_session)
  }
  return (
    <SessionContext.Provider value={[session, setSessionWrapper]}>
      {children}
    </SessionContext.Provider>
  );
}

export function api(api_url, input, callback, failure_callback) {
  input = input || {}
  input.session = g_session
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
    backend_output.session = backend_output.session || g_session
    g_session = backend_output.session
    localStorage.session = JSON.stringify(g_session)
    callback && callback(backend_output)
  })
  .catch(function(error) {
    console.log(error)
    failure_callback && failure_callback(error);
  })
}
