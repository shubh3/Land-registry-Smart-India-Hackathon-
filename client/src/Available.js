import React, { Component } from 'react';
import Identicon from 'identicon.js';




import ParticleComponent from "./ParticleComponent";

import { HopscotchContext, StartButton } from 'react-guided-tour';
class Available extends Component {

  render() {
    
   
    return (
      <div>
       
 
      <div className="container-fluid mt-5">
      
        <div className="row">

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '850px' }}>
            <div className="content mr-auto ml-auto">
            


              <p>&nbsp;</p>




             
              
                
  

                 <div align="center" >
      <h1 id="ab">Make your Land available for sell</h1>
      <br/>
      </div>
       
           
       
       
      <br/>
      <br/> 
      <form  onSubmit={(event) => {
                  event.preventDefault()
                  const avail= this.avail.value
                  const valid =true
                   this.props.isavailable(avail,valid)
               
                 
                }}>

                <div id="abde" className="form-group mr-sm-2">
                  <input
                    id="land"
                    type="text"
                    ref={(input) => { this.avail = input }}
                    className="form-control"
                    placeholder="land no."
                     
                    required />
                    
                </div>

                <div align="center">

                <button type="submit" className="btn btn-primary ">Available for sell</button>   <p>          </p>

                 
                   </div>

               
              </form>


              <p>&nbsp;</p>

              { this.props.my.map((post, key) => {
                return(
                  <div  id="a2" class="shadow-lg p-3 mb-5 bg-white rounded">
                  
                  <div id="#rcorners2" className="card border-info mb-3" key={key} >
                 
                    <div  className="card-header">
                      <img
                        className='mr-2'
                        width='50'
                        height='50'
                       src={`data:image/png;base64,${new Identicon(post.owner, 30).toString()}`}
                         
                      />
                      
                   Land number  :     {post.tokenid}
                      


                    </div>

                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                     <small className="float-left mt-1 text-muted">

                        Adhaar number :{post.adhaarno}  
                        
                         </small>
                      </li>
                       <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          
                           First Name : {post.fname}
                        </small>
                      
                     </li>

                       <li key={key} className="list-group-item py-2">
                        <small  id="step6" className="float-left mt-1 text-muted">
                          
                           Last name : {post.lname}

                        </small>
                         



                     </li>
                     <li key={key} className="list-group-item py-2">
                        <small  id="step6" className="float-left mt-1 text-muted">
                          
                           Ethereum Address : {post.owner}

                        </small>
                         



                     </li>
                     
                         



            

                   
                   
                    </ul>

                  </div>
                   </div>


                )
              
              })}



              
             


            </div>


          </main>
        </div>
      </div>
      </div>
    );

  }
}
export default Available;