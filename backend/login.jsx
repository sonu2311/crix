import {Header} from './header';
import React from 'react';
import {api} from './library';
import './main.css';

function Login() {
  const [email, setEmail]=React.useState("")
  const [password, setPassword]=React.useState("")

  const login = function(){
    api("/login", {email:email, password:password}, function(backend_output){
      if("error" in backend_output){
        alert(backend_output.error)
      }
      else{
        console.log("Login successful !")
        window.location.href = "#/home_url"
      }
    })
  }
  return (
    <div >
      <Header/>
      <div>
        <div className="login_main_div">
          <div className="login_header">Login</div>
          <div className=" login_header_down_div">
            <div className="email_password_full_div">
              <div className="email_password_name_div"
              >Email</div>
              <div>
                <input className="email_password_input_div" type="text" name="name" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
            </div>
            <div className="email_password_full_div">
              <div className="email_password_name_div">Password</div>
              <div>
                <input className="email_password_input_div" type="password" name="name" value={password} onChange={(e)=> setPassword(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className="login_button_div btn btn-primary active">
            {/*<img src="https://i.gifer.com/ZZ5H.gif" style="width:15px; color:blue;margin: 2px;vertical-align: middle; " ng-if="is_login_disabled==true"/>*/}
            <button className="login_button" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;