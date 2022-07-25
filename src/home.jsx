import './main.css';
import './library.css';
import {Header} from './header';
import React from 'react';

function Home(){
    return (
        <>
            <Header/>
            <div className='hsplit' >
                <div style={{border:"solid #ccc 1px", width:"100px" }}>1</div>
                <div>
                    <div>Name</div>

                </div>
            </div>
        </>
    );
}

export default Home;