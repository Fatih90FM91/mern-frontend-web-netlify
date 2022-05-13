import React, { Component } from 'react';
import axios from 'axios';
import './Message.css'

const devENV = process.env.NODE_ENV !== "production";

const {REACT_APP_DEV_API  , REACT_APP_PROD_API} = process.env;



export default class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
        result:''
        
        }
      }

   
  componentDidMount = () =>{
  console.log(this.props);
  let id =this.props.match.params.id;
  axios.get(`${devENV ? REACT_APP_DEV_API : REACT_APP_PROD_API}/`) //there is some problem for deploying..!!!
    .then( res => {

      console.log(res.data);
      this.setState({ result: res.data })
     
      // let token = response.data.token;
      // localStorage.setItem('user', token)
      // this.props.history.push('/all-users')
    })
    .catch( err => console.log(err))

  }

  

  render() {

    
    
    return (
      <>
      <h1>All Anwers </h1>
      <div className='messages'>

            {this.state.result && this.state.result.map((result) =>{
             
             return(
               <div key={result._id} className='answer-css'>
                 <h5>{}</h5>
                 <h4>{result.answer}</h4>
                 <p><strong>This is Answer Date:</strong> {result.created_at}</p>
                 
               </div>
              
             )
          })}

 
      </div>
      </>
    )
  }
}

