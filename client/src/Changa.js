import React, { Component } from 'react';
import Identicon from 'identicon.js';
import r from './right.gif'
import w from './wrong.gif'



import ParticleComponent from "./ParticleComponent";

import { HopscotchContext, StartButton } from 'react-guided-tour';
class Changea extends Component {

  render() {
    
   
    return (
      <div>
       
 
      <div className="container-fluid mt-5">
      
        <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '850px' }}>
            <div className="content mr-auto ml-auto">
            


              <p>&nbsp;</p>




             
              
                
  

                 <div align="center" >
      <h1 id="ab">Government Change portal</h1>
      <br/>
      </div>
       
           
       
       
      <br/>
      <br/> 
      <form  onSubmit={(event) => {
                  event.preventDefault()
                  const changea = this.changea.value
                 
                   this.props.changeadmin(changea)
               
                 
                }}>

                <div id="abde" className="form-group mr-sm-2">
                  <input
                    id="land"
                    type="text"
                    ref={(input) => { this.changea = input }}
                    className="form-control"
                    placeholder="New Gov address"
                     
                    required />
                    
                </div>

                <div align="center">

                <button type="submit" className="btn btn-primary ">Change</button>   <p>          </p>

                 
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
export default Changea;