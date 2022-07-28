import {Header} from './header';
import React from 'react';
import {api} from './library';
import './main.css';
import {SessionContext} from './library';

function Signup(){
	const [name, setName]= React.useState("")
	const [email, setEmail]= React.useState("")
	const [phone, setPhone]= React.useState("")
	const [password, setPassword]= React.useState("")
	const [session, setSession] = React.useContext(SessionContext)

	const sign_up = function(){	
    api("/sign_up", {name: name, email:email, phone:phone, password:password}, 
      function(backend_output){
      console.log(backend_output)
      if("error" in backend_output) {
        alert(backend_output.error)
        console.log(backend_output.error)
      }
      else{
        console.log("sign up successful")
				setSession(backend_output.session)
        window.location.href = "#/home"
      }
		})
	}
	return (
		<div>
			<Header/>
			<div className="login_main_div sing_up_margin_top">
				<div className="login_header">Sign up</div>
				{/* <h1>{name}</h1> */}
				<div className="login_header_down_div">
					<div className="email_password_full_div">
						<div className="email_password_name_div">Name</div>
						<div>
							<input className="email_password_input_div" type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
						</div>
					</div>	
				</div>
				<div className="email_password_full_div">
					<div className="email_password_name_div">Email</div>
					<div>
						<input className="email_password_input_div" type="text" name="name"  value={email} onChange={(e)=> setEmail(e.target.value)}/> 
   					</div>
				</div>
				<div className="email_password_full_div">
					<div className="email_password_name_div">Phone number</div>
					<div>
						<input className="email_password_input_div"type="text" name="name" ng-model="number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
					</div>
				</div>
				<div className="email_password_full_div">
					<div className="email_password_name_div">Password</div>
					<div>
						<input className="email_password_input_div" type="password" name="name" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>
				</div>
				<div className="login_button_div" >
					{/*<img src="https://i.gifer.com/ZZ5H.gif" style="width:15px; color:blue;margin: 2px;vertical-align: middle; " ng-if="is_sign_up_disabled==true"/>*/}
					<button className="login_button"  onClick={sign_up}>
						Sign up
					</button>	
				</div>
			</div>
			
		</div>
	);
}


export default Signup;