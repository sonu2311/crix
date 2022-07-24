import './main.css';
import {Header} from './header';
import React from 'react';
import {api} from './library';


function Example1() {
  const [name, setName] = React.useState("A")

  React.useEffect(()=> {
    api("/my_name", {age: 60}, function(backend_output) {
      console.log(backend_output)
      setName(backend_output.name)
    })
  }, []);

  const new_name = function() {
    api("/new_name", {age: 61}, function(backend_output) {
      setName(backend_output.name)
    })
  }

  return (<>
    <Header/>
    <div className="top_box" >
      <h2>Example1</h2>
      <div>
        Name = {name}
      </div>
      <button onClick={() => new_name()} >Click for new name</button>
    </div>
  </>
  );
}

export default Example1;
