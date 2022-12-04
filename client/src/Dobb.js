import React, { Component } from 'react';
import Identicon from 'identicon.js';
import r from './right.gif'
import w from './wrong.gif'



import ParticleComponent from "./ParticleComponent";

import { HopscotchContext, StartButton } from 'react-guided-tour';
class Dobb extends Component {

  render() {
    
   
    return (
      <div>
       
 
      <div className="container-fluid mt-5">
      
        <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '850px' }}>
            <div className="content mr-auto ml-auto">
            


              <p>&nbsp;</p>




             
              
                
  

                 <div align="center" >
      <h1 id="ab">Bank vote portal</h1>
      <br/>
      </div>
       
           
       
       
      <br/>
      <br/> 
      <form  onSubmit={(event) => {
                  event.preventDefault()
                
                 const valid =true
                   this.props.bankadmin(valid)
               
                 
                }}>

              
                 

                <div align="center">

                <button type="submit" className="btn btn-primary">YES</button>   <p>          </p>
               


                 <button className="btn btn-primary" id="close-CSS1" type="submit" onClick={(event) => {
                  event.preventDefault()
                
                 const valid=false
                   this.props.bankadmin(valid)
                 
                  }}>No</button>

               </div>
              </form>


              <p>&nbsp;</p>

 
            
             


            </div>


          </main>
        </div>
      </div>
      </div>
    );

  }
}
export default Dobb;