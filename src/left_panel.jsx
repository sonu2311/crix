import './main.css';
import './library.css';
import React from 'react';


export function LeftPanel(){
  const allcontactslist=[{name:"mohit"}, {name:"pooja"}, {name:"rohit"}, {name:"sonu"}]
  return (
    <>
      <div>Chat</div>
      {allcontactslist.map((x)=>(
         <div>{x.name}</div>
      ))}
     
    </>
  );
}