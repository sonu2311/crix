import './main.css';
import './library.css';
import {Header} from './header';
import React from 'react';
import { ChatSection } from './chat';
import { LeftPanel } from './left_panel';

function Home(){
    return (
        <>
          <Header/>
          <div className='hsplit'>
            <div className="left_panel">
              <LeftPanel/>
            </div>
            <div className='mid_panel'>
              <ChatSection/>
            </div>
          </div>
        </>
    );
}

export default Home;