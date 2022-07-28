import './library.css';
import React from 'react';
import {SessionContext} from './library';


export function Header2() {
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
      <div>
        <a href="#/header">
          <div className="link_box" >Header</div>
        </a>
      </div>
      <div>
        <a href="#/home">
          <div className="link_box" >Home</div>
        </a>
      </div>
    </div>
  );
}


export function Header() {
  const [session, setSession] = React.useContext(SessionContext)
  const isLogin = ("login_key" in session && "id" in session.login_key && session.login_key.id != null)
  const profile_name=""
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)


  const menuOpenClose = function(){
    setIsMenuOpen(!isMenuOpen)
    console.log("isMenuOpen===", isMenuOpen)
  }

  const logout =function(){
    setSession({})
    window.location.href = "#/login"
  }

  return (
    <>
      <div className="head_div" style={{}} ng-controller="ctrl_header">
        <div className="hsplit" style={{}}>
            <div className="logo" style={{}}>
            <a href={"#/home"}>
              <span className="material-icons" style={{fontSize: '25px', verticalAlign: 'middle', marginRight: '10px', color: '#006666'}}>
                home
              </span>
            </a>
            </div>
            <div className="title" style={{display: 'none'}}>
              Crix
            </div>
            <div className="hsplit navbar_tabs" style={{float: 'right', marginRight: '25px'}}>
            <div className="show-md hide-xs show-sm">
              {!isLogin && (
                <div style={{}}>
                  <a href={"#/login"}>
                    <div className="heading">
                    Login
                    </div>
                  </a>
               </div>
              )}

            </div>
            <div className="show-md hide-xs show-sm">
              {isLogin && ( 
                <a href={"#/profile/" + session.login_key.id} >
                  <div className="heading hsplit" style={{}}>
                    <div style={{marginRight: '10px', borderRadius: '50%', textAlign: 'center', overflow: 'hidden', verticalAlign: 'middle', whiteSpace: 'nowrap'}}>
                      <img style={{width: '35px', height: '35px', verticalAlign: 'middle'}} src={session.login_key.profile_pic} alt="" />
                    </div>
                    
                    <div style={{marginLeft: '5px', fontSize: '18px'}}>
                      {session.login_key.name}
                    </div>
                  </div>
                </a>
              )}
            </div>
            <div className="show-md hide-xs show-sm">
              {!isLogin && (
                <a href={"#/signup"}>
                  <div className="heading">
                      Sign Up
                  </div>
                </a>
              )}
            </div>
            <div className="show-md show-xs show-sm" style={{paddingTop: '6px'}}>

                <a>
                  <div className="menu" onClick={menuOpenClose}>
                      <span className="material-icons" style={{fontWeight: 600}}>
                        more_vert
                      </span>
                  </div>
                </a>

            </div>
            </div>
            {isMenuOpen && (
              <div style={{position: 'fixed', top: '62px', right: '23px', borderRadius: '2px', boxShadow: '1px 2px 3px #888888', cursor: 'pointer', zIndex: '100px', backgroundColor: '#fff'}} >
                {isLogin && (  
                  <div className="hide-md show-xs hide-sm logout_div" style={{backgroundColor: '#eee'}}>
                    <a href={"#/profile/" + session.login_key.id} >
                      <div className="hsplit">
                        <div>
                          <img style={{width: '35px', height: '35px', borderRadius: '15px'}} src={session.login_key.image} alt="" /> 
                        </div>
                        <div style={{marginLeft: '5px', fontSize: '15px', marginTop: '5px'}}>
                          {session.login_key.name}
                        </div>
                        </div>
                      </a>
                  </div>
                )}
                <div className="logout_div" ng-if="role=='USER'">
                  <a href={"#/edit_profile"} style={{textDecoration: 'none'}}>
                    <div>
                        Edit Profile
                    </div>
                  </a>
                </div>
                {!isLogin && (
                  <div className="hide-md show-xs hide-sm logout_div" >
                    <a href={"#/login"} style={{textDecoration: 'none'}}>
                      <div>
                        Login
                      </div>
                    </a>
                  </div>
                )}
                {!isLogin && (
                  <div className="hide-md show-xs hide-sm logout_div">
                    <a href={"#/signup_url"} style={{textDecoration: 'none'}}>
                      <div>
                        Sign Up
                      </div>  
                    </a>
                  </div>
                )}
                {isLogin && (
                  <div className="logout_div">
                    <a onClick={logout} style={{textDecoration: 'none'}}>
                      <div>
                        Logout
                      </div>
                    </a>
                  </div>
                )} 
              </div>
            )}
        </div>
      </div>
      <div style={{height: '67px'}} />
    </>

  )
}
