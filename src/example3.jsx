import {Header} from './header';
import React from 'react';
import {api} from "./library"

function Example3() {

  // React.useEffect(() => {
  //   api("/login", {email: "a@b.com", password: "pass"}, function(backend_output){
  //     console.log(backend_output)
  //   });
  // }, [])

  // React.useEffect(() => {
  //   api("/sign_up", {name: "Sonu", email: "ab3@g.com", password: "pass"}, function(backend_output){
  //     console.log(backend_output)
  //   });
  // }, [])

  return (
    <div >
      <Header/>
      <div>
        Example3
      </div>
    </div>
  );
}

export default Example3;
