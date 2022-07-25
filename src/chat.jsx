import './main.css';
import './library.css';
import React from 'react';

export function ChatSection(){

  const chat_list = [
    {
      name: "Sonu",
      content: "Hi Sonu..",
      user_id: 1,
      chat_time_at_str: "25-7-22",
    },
    {
      name: "Sonu2",
      content: "Hi Sonu2..",
      user_id: 2,
      chat_time_at_str: "25-7-22",
    },
  ]; 
  const loginPersonName = "sonu"
  const login_id = 2

  return (
    <>
      <div ng-controller="ChatCtrl">
        <div style={{backgroundColor: '#128C7E', color: '#fff', padding: '15px', border: 'solid #ccc 1px', fontSize: '18px', fontWeight: 500}}>
          <div style={{width: '50%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{loginPersonName}</div>
        </div>
        <div style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', height: 'calc( 100vh - 195px)', overflowY: 'scroll'}} id="chat_scroll_container">
          <div style={{padding: '10px 25px'}}>
            {chat_list.map((x)=>(
              <div className="hsplit" style={{padding: '3px 0px'}}>
                
                <div className="chat_div" style={{float: (x.user_id==login_id) ? "right":"left",backgroundColor: (x.user_id==login_id) ? "rgb(220, 248, 198)":"#fff"}}>
                  <div style={{fontSize: '12px', color: 'blue', paddingBottom: '5px'}}>
                    {x.name}
                  </div>
                  <div>{x.content}</div>
                  <div style={{float: 'right', fontSize: '12px', color: '#3a7f48', paddingTop: '5px'}}>
                    {x.chat_time_at_str}
                  </div>
                </div>

              </div>
            ))}
          </div>	
        </div>
        <div style={{height: '50px', verticalAlign: 'middle', padding: '1px 15px'}}>
          <textarea style={{borderRadius: '35px', padding: '10px 20px', float: 'left', width: 'calc(100% - 80px)', height: '20px', outline: 'none', resize: 'none', border: '1px solid grey', marginBottom: '5px', marginTop: '10px'}} placeholder="Comment" ng-model="chat_content" ng-keyup="chat_textarea_key_down($event)" defaultValue={"\t\t"} />
          <span className="material-icons" style={{cursor: 'pointer', verticalAlign: 'middle', marginTop: '20px', marginLeft: '5px', color: '#444'}} ng-click="send_msz()">
            send
          </span>		
        </div>
      </div>
      
    </>
  );
}
