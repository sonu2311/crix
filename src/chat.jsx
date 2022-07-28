import './main.css';
import './library.css';
import React from 'react';
import {api} from './library';
import {SessionContext} from './library';

export function ChatSection({focusedPersonId}){

  const [chatList , setChatList] =React.useState([])
  const [session, setSession] = React.useContext(SessionContext)
  const [content, setContent] = React.useState("")
  const [oldestId, setOldestId] = React.useState(0)
  const newestId = React.useRef(0)


  // "user_id": 3, "older_than": None, "limit": 20


  React.useEffect(()=> {
    const keepLoadingNewmessages = function(){
      setTimeout(()=> {
        api("/get_new_messages", {"user_id":focusedPersonId,"newer_than": newestId.current }, function(backend_output) {
          newestId.current = (backend_output.newest_id)
          console.log("chatList===",chatList )
          setChatList(chatList.concat(backend_output.messages))
          console.log("backend_output==", backend_output)
  
          // keepLoadingNewmessages()
  
        })
      },2000 )
      
    }

    api("/get_old_messages", {"user_id":focusedPersonId,"older_than": null, "limit": 3  }, function(backend_output) {
      console.log(backend_output)
      setChatList(backend_output.messages)
      setOldestId(backend_output.oldest_id)
      newestId.current = (backend_output.newest_id)
      // keepLoadingNewmessages()

    })

  }, []);

  const send_message= function(){
    api("/send_message", {"receiver_id":focusedPersonId,"content":content }, function(backend_output) {
      console.log(backend_output)
      setContent("")
      
    })
  }
  const loadOldMessages =function(){
    api("/get_old_messages", {"user_id":focusedPersonId,"older_than": oldestId, "limit": 3  }, function(backend_output) {
      console.log(backend_output)
      setChatList(backend_output.messages.concat(chatList))
      setOldestId(backend_output.oldest_id)
    })
  }

  const loadNewMessages =function(){
    api("/get_new_messages", {"user_id":focusedPersonId,"newer_than": newestId.current }, function(backend_output) {
      console.log(backend_output)
      setChatList(chatList.concat(backend_output.messages))
      newestId.current = (backend_output.newest_id)
    })
  }

//  $timeout(function() {
//     document.getElementById("chat_scroll_container").scrollTo(0, 10000);
//   }, 0);
  // "id": 5,
  //     "sender_id": 3,
  //     "receiver_id": 1,
  //     "content": "M5",
  //     "chat_time": 1658923614,
  //     "name": "Monu",
  //     "chat_time_str": "2022-07-27 05:36:54 PM"

  return (
    <>
      <div>
        <div style={{backgroundColor: '#128C7E', color: '#fff', padding: '15px', border: 'solid #ccc 1px', fontSize: '18px', fontWeight: 500}}>
          <div style={{width: '50%', whiteSpace:'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {"mohit"}</div>
        </div>
        <div style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', height: 'calc( 100vh - 195px)', overflowY: 'scroll'}} id="chat_scroll_container">
          <div style={{padding: '10px 25px'}}>
            <button onClick={loadOldMessages}>load old messages</button>

            oldestId = {oldestId}, newestId = {newestId.current}
            {chatList.map((x)=>(
              <div className="hsplit" style={{padding: '3px 0px'}}>
                
                <div className="chat_div" style={{float: (x.sender_id==session.login_key.id) ? "right":"left",backgroundColor: (x.sender_id==session.login_key.id) ? "rgb(220, 248, 198)":"#fff"}}>
                  <div style={{fontSize: '12px', color: 'blue', paddingBottom: '5px'}}>
                    {x.name}
                  </div>
                  <div>[{x.id}] {x.content}</div>
                  <div style={{float: 'right', fontSize: '12px', color: '#3a7f48', paddingTop: '5px'}}>
                    {x.chat_time_str}
                  </div>
                </div>

              </div>
            ))}
          </div>
          <button onClick={loadNewMessages}>load new messages</button>	
        </div>
        <div style={{height: '50px', verticalAlign: 'middle', padding: '1px 15px'}}>

          <textarea style={{borderRadius: '35px', padding: '10px 20px', float: 'left', width: 'calc(100% - 80px)', height: '20px', outline: 'none', resize: 'none', border: '1px solid grey', marginBottom: '5px', marginTop: '10px'}} placeholder="Comment" value={content} onChange={(e)=>setContent(e.target.value)} />

          <span className="material-icons" style={{cursor: 'pointer', verticalAlign: 'middle', marginTop: '20px', marginLeft: '5px', color: '#444'}} onClick={send_message}>
            send
          </span>		
        </div>
      </div>     
    </>
  );
}
