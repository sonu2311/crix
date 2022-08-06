import './main.css';
import './library.css';
import React from 'react';
import {api} from './library';
import {SessionContext} from './library';


export function ChatSection2({focusedPersonId2}){
  const [session, setSession] = React.useContext(SessionContext)
  const [chatList , setChatList] =React.useState([])
  const [content, setContent] = React.useState("")
  const [oldestId, setOldestId] = React.useState(0)
  const newestId = React.useRef(0)
  const stoper = React.useRef(false)

  const keepLoadingNewmessages = function(){
    setTimeout(()=>{
      if (stoper.current){
        return
      }
      api("/get_new_messages", {"user_id":focusedPersonId2,"newer_than": newestId.current }, function(backend_output) {
        console.log(backend_output)
        setChatList(chatList.concat(backend_output.messages))
        // setChatList([...chatList, ...backend_output.messages])
        newestId.current = (backend_output.newest_id)
        keepLoadingNewmessages()
      })
    }, 3000)

  }

  React.useEffect(()=> {

    api("/get_old_messages", {"user_id":focusedPersonId2,"older_than": null, "limit": 3  }, function(backend_output) {
      console.log(backend_output)
      setChatList(backend_output.messages)
      setOldestId(backend_output.oldest_id)
      newestId.current = (backend_output.newest_id)
      keepLoadingNewmessages()
    })
    return () =>{
      stoper.current = true
    }
     
    
  }, []);

  const send_message= function(){
    api("/send_message", {"receiver_id":focusedPersonId2,"content":content }, function(backend_output) {
      console.log(backend_output)
      setContent("")
      
    })
  }
  const loadOldMessages =function(){
    api("/get_old_messages", {"user_id":focusedPersonId2,"older_than": oldestId, "limit": 3  }, function(backend_output) {
      console.log(backend_output)
      // setChatList(backend_output.messages.concat(chatList))
      setChatList([...backend_output.messages, ...chatList])
      setOldestId(backend_output.oldest_id)
    })
  }

  // const loadNewMessages =function(){
  //   api("/get_new_messages", {"user_id":focusedPersonId2,"newer_than": newestId.current }, function(backend_output) {
  //     console.log(backend_output)
  //     setChatList(chatList.concat(backend_output.messages))
  //     // setChatList([...chatList, ...backend_output.messages])
  //     newestId.current = (backend_output.newest_id)
  //   })
  // }


  return (
    <>
      <div>
       
        <div style={{backgroundColor: '#128C7E', color: '#fff', padding: '15px', border: 'solid #ccc 1px', fontSize: '18px', fontWeight: 500}}>
          <div style={{width: '50%', whiteSpace:'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {"----99999"}</div>
        </div>
        <div style={{backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', height: 'calc( 100vh - 195px)', overflowY: 'scroll'}} id="chat_scroll_container">
          <div style={{padding: '10px 25px'}}>
            
            <div style={{textAlign: "center", marginTop:"15px"}}>
              <button className='oldMessagesbutton'  onClick={loadOldMessages}>load old messages</button>
            </div>
            
            {chatList.map((chat)=>(
              <div className="hsplit" style={{padding: '3px 0px'}}>
                
                <div className="chat_div" style={{float: (chat.sender_id==session.login_key.id) ? "right":"left",backgroundColor: (chat.sender_id==session.login_key.id) ? "rgb(220, 248, 198)":"#fff"}}>
                  <div style={{fontSize: '12px', color: 'blue', paddingBottom: '5px'}}>
                    {chat.name}
                  </div>
                  <div>[{chat.id}] {chat.content}</div>
                  <div style={{float: 'right', fontSize: '12px', color: '#3a7f48', paddingTop: '5px'}}>
                    {chat.chat_time_str}
                  </div>
                </div>

              </div>
            ))}
          </div>
          {/* <button onClick={loadNewMessages}>new messages</button> */}
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
