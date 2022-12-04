import React, { Component } from 'react';
import Identicon from 'identicon.js';




import ParticleComponent from "./ParticleComponent";

import { HopscotchContext, StartButton } from 'react-guided-tour';
class Pp extends Component {

  render() {
    
   
    return (
      <div>
       
 
      <div className="container-fluid mt-5">
      
        <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '850px' }}>
            <div className="content mr-auto ml-auto">
            


              <p>&nbsp;</p>




             
              
                
  

                 <div align="center" >
      <h1 id="ab">Peer to Peer land tranfer portal</h1>
      <br/>
      </div>
       
          
       
      <br/>
      <br/> 
      <form  onSubmit={(event) => {
                  event.preventDefault()
                  const land= this.land.value
                 const fname= this.name.value
                 const lname= this.lname.value
                 const no= this.adha.value
                   

                    const to= this.to.value
                this.props.transfer(land,to,no,fname,lname)
                 
                }}>

                <div id="abde" className="form-group mr-sm-2">
                  <input
                    id="land"
                    type="text"
                    ref={(input) => { this.land = input }}
                    className="form-control"
                    placeholder="land no."
                     
                    required />
                    <br />
                    <div align="center">

                     <button className="btn btn-primary" id="close-CSS1" type="submit" onClick={(event) => {
                  event.preventDefault()
                 const land= this.land.value
                 
                   this.props.isallclear(land)
                 
                  }}>Validate</button>
                  </div>
       
                    <br />
                     <br />

 <input
                    id="land"
                    type="text"
                    ref={(input) => { this.to = input }}
                    className="form-control"
                    placeholder="Tranfer to ?"
                     
                    required /> 
                    <br />   
                     <input
                    id="name"
                    type="text"
                    ref={(input) => { this.name = input }}
                    className="form-control"
                    placeholder="First name."
                     
                    required />
                     <br />
                      <input
                    id="name"
                    type="text"
                    ref={(input) => { this.lname = input }}
                    className="form-control"
                    placeholder="last name."
                     
                    required />
                     <br />         
                     <input
                    id="name"
                    type="text"
                    ref={(input) => { this.adha = input }}
                    className="form-control"
                    placeholder="Adhaar no.."
                     
                    required />
                     <br />         
                </div>

                

                <button type="submit" className="btn btn-primary btn-block">Tranfer the Land</button>

               
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
export default Pp;