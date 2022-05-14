import React, { Component } from 'react'
import axios from 'axios';

import './Form.css';


const devENV = process.env.NODE_ENV !== "production";

const {REACT_APP_DEV_API  , REACT_APP_PROD_API} = process.env;

console.log(REACT_APP_PROD_API)
console.log(devENV);
console.log(process.env.NODE_ENV);


export default class Login extends Component {
 constructor(props){
   super(props);

   this.state = {
     email:'',
     password:'',
     result:''
   }
 }


 handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value})
}

  handleSubmit = e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
      
    }
    axios.post(`${devENV ? REACT_APP_DEV_API : REACT_APP_PROD_API}/login`, data)
          .then( response => {
            let token = response.data.token;
            console.log(token);
            localStorage.setItem('user', token)
            this.props.history.push('/');
            
            
            
          })
          .catch( err => {
            this.setState({ result: err.response.data.errors })
            console.log(err.response.data.errors);
          })
  
  };
  render() {
    return (
      <div className='form-content-right'>
        <form onSubmit={this.handleSubmit} className='form' noValidate>
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
     
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
             
              onChange={this.handleChange}
            />
            {this.state.result.email && <p>{this.state.result.email}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              
              onChange={this.handleChange}
            />
             {this.state.result.password && <p>{this.state.result.password}</p>}
          </div>
      
          <button className='form-input-btn' type='submit' onSubmit={this.handleSubmit}>
            Sign in
          </button><br />
          <span className='form-input-login'>
            Already have an account? Login <a href='#'>here</a>
          </span>
        </form>
       
       <div className='left-side-img'>
           
           <img src="img\360_F_266746256_YnTULqocz4cbfdfZvz6815bGwEK4YZWx-removebg-preview.png" alt="" />
       </div>
        
      </div>
    )
  }
}
