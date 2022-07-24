import './library.css';
import React from 'react';

export function Header() {
  return (
    <div className="hsplit" >
      <div>
        <a href="#/example1">
          <div className="link_box" >Example1</div>
        </a>
      </div>
      <div>
        <a href="#/example2">
          <div className="link_box" >Example2</div>
        </a>
      </div>
      <div>
        <a href="#/example3">
          <div className="link_box" >Example3</div>
        </a>
      </div>
    </div>
  );
}
