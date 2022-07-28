import './main.css';
import './library.css';
import {Header} from './header';
import React from 'react';
import { ChatSection } from './chat';
import { LeftPanel } from './left_panel';
import { useParams } from 'react-router-dom';

function Home(){
  const {id}= useParams()
    return (
        <>
          <Header/>
          <div className='hsplit'>
            <div className="left_panel">
              <LeftPanel id={id} />
            </div>
            <div className='mid_panel'>
              {id>0 &&(
                <ChatSection focusedPersonId={id}  key={id}/>
              )}
            </div>
          </div>
        </>
    );
}

export default Home;