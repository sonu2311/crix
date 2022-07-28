import './main.css';
import './library.css';
import React from 'react';
import {api} from './library';


export function LeftPanel({id}){
  const [chatSummary, setChatSummary]=React.useState([])

  React.useEffect(()=> {
    api("/get_chat_summary", {}, function(backend_output) {
      console.log(backend_output)
      setChatSummary(backend_output.chat_summary)

    })
  }, []);

// chat_time: 1658923614
// chat_time_str: "2022-07-27 05:36:54 PM"
// content: "M29"
// name: "Monu"
// other_person_id: 3
// profile_pic: "images/person.png"
// sender_id: 1
// onClick={()=>{setFocusedPersonId(x.other_person_id); setFocusedPersonName(x.name)}}
 
  return (
    <>
      <div className="chat_word">Chat</div>
      {chatSummary.map((x)=>(
        <a href={"#/home/" + x.other_person_id}>
        <div   className='chat_summary_div' style={{boxSizing: 'border-box', marginTop: '6px', backgroundColor: x.other_person_id== id ? "#e6f4ea" :null}}>	
          <div className="hsplit">
            <div style={{boxSizing: 'border-box', width: '20px'}}>
              <div style={{marginTop: '1px'}} className="hsplit">
                <div style={{textAlign: 'center', overflow: 'hidden', verticalAlign: 'middle', whiteSpace: 'nowrap', borderRadius: '50%'}}>
                  <img style={{height: '20px', width: '20px', verticalAlign: 'middle'}} src={x.profile_pic} />
                </div>
              </div>
            </div>
            <div style={{boxSizing: 'border-box', width: 'calc(100% - 40px)'}}>
                <div style={{marginRight: '20px', display: 'inline-block', textAlign: 'justify', textJustify: 'inter-word', marginTop: '1px', borderRadius: '8px', padding: '2px'}}>
                  <div style={{color: '#111', fontWeight: 600, fontSize: '12px'}}>
                    {x.name}
                  </div>
                  <div style={{fontSize: '12px', paddingTop:"4px"}}>
                    {x.content} 
                  </div>
                </div>
              <div style={{color: '#999', fontWeight: 600, fontSize: '9px', paddingLeft: '5px', paddingTop: '5px'}}>{x.chat_time_str}</div>
            </div>
            <div style={{boxSizing: 'border-box', width: '20px', padding:"8px 10px"}}>
              <span className="material-icons" style={{fontSize: '18px'}}>
                more_vert
              </span>
            </div>
          </div>		
        </div>
        </a> 
      ))}
     
    </>
  );
}