pragma solidity 0.5.8;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
contract Land is ERC721Full/*,ERC721Burnable*/ {


 uint public postCount = 1;
 uint public count = 1;
      bool dwater;
      bool dbank;
      bool delec;
   address public electricity=0x48E93E9ad94ea0AAd209aBe5BC879040447aCE98;    
   address public gov=0x917937a261789cf3380021944A1464Fa38586f0e;

   
    constructor() ERC721Full("landno","Land") public {

     dwater=false;
     dbank=false;
     delec=false;
        
        }
    
     uint[] public landno;  //for storing land


  mapping(uint => Citizen) public posts;
   mapping(uint => bool) public landminted; // for checking the minting staus of land(minted or not)
    mapping (uint => bool) services;
     mapping(string => address) stateAdmin;
      mapping(string => address) talukaAdmin;
       mapping(string => address) dist;
   //  mapping (uint => bool) availables;
        mapping (uint=> bool) waterrs;
         mapping (uint => bool) eleccs;
          mapping (uint => bool) loanns;
           mapping (uint => uint) map;
            mapping (uint => uint) mapt;
            
    
    mapping(uint => address) private landOwner;
 //   mapping(string => address) private adhaarno;

 //mapping citizen to his land
  //  mapping(address => Citizen) citizens;
   // address[] public citizendetail;


    
    struct Citizen {
        
        string adhaarno;
        string fn;
        string initiatedwith;
        
        string state;
        string district;
      //  string taluka;
        string village;
        uint tokenid;
        /*bool water;
        bool bank;
        bool elec;
       */
        
    }
    
    //assigning admins for state and village
 function talukaadmin(address talukaa,string memory taluka,string memory district)  public {
  require(msg.sender==dist[district]);

        talukaAdmin[taluka]=talukaa;
    }
     function stateadmin(address statea,string memory state )  public {
      require(msg.sender==gov);

        stateAdmin[state]=statea;
    }
    function districtadmin(address dista,string memory district ,string memory state)  public {
      require(msg.sender==stateAdmin[state]);
        dist[district]=dista;
    }
      
  /* function wateradmin(bool valid) public {

require(msg.sender==electricity);
    
    if(valid)
    {
      dwater =true;
    }
    else
    {
      dwater =false;

    }


   }

 function elecadmin(bool valid) public {

require(msg.sender==electricity);

   
    if(valid)
    {
      delec =true;


    }
    else
    {
      delec =false;
    }


   }

 function bankadmin(bool valid) public {

require(msg.sender==electricity);

   
    if(valid)
    {
      dbank =true;

    }
    else
    {
      dbank =false;
    }


   }
*/
    function changeadmin(address govern) public {

require(msg.sender==gov && dwater && delec && dbank);
   
    gov = govern;



   }
     
event PostCreated(
        string adhaarno,
        string fname,
         string initiatedwith,
        
        string state,
       
        string district,
         string village,
       // string taluka,
        uint tokenid
        /*bool water,
        bool bank,
        bool elec*/
       
       
      

         );



   




//To get the Details of land owner
/*
function getcitizen(address add) view public returns(string memory,string memory,string memory)
{
    return (citizens[add].adhaarno,citizens[add].fname,citizens[add].lname);
}



*/

// Task of government

function mint(uint mland) public {

   
   require (!landminted[mland]);  //land should not be minted previously
 //  require (msg.sender==gov,"only government can mint" /* && dwater && delec && dbank*/);
   uint no = landno.push(mland); // adds land to the array of minted land
   _mint(msg.sender,mland);   
   map[postCount]=mland;     //assign land ro the sender of function
    landminted[mland]=true; 

    services[mland]=false;
   //checkvalues[mland]=false;

     waterrs[mland]=false;
    eleccs[mland]=false;
    loanns[mland]=false;
     postCount++;

    landOwner[mland]=msg.sender;    // assigns true value so that it cannot be minted again
    
}
     
function burn(uint256 tokenId) public{
   _burn(tokenId);
   uint a=map[tokenId];
   delete landno[a];
   landminted[tokenId]= false;
   delete posts[a];
   postCount--;
  // delete posts[a];
  count--;
  }

//Government assigning land to their particular owner based on their adhaar card


function govtransfer( uint  tokenId,string memory no,string memory name,string  memory state,string  memory district,string  memory village) public{
require (landminted[tokenId]);
require (msg.sender==gov/*  && dwater && delec && dbank*/ );
//require (services[tokenId]);



//adhaarno[madhaar]=to;
 //Citizen storage citizen = citizens[to];

 mapt[tokenId]=count;

  //  citizendetail.push(to) -1;
    posts[count] =  Citizen(no,name,"Not available for sale",state,district,village,tokenId);
 emit PostCreated(no,name,"Not available for sale",state,district,village,tokenId);
 count++;

}




/* function owner(uint  tokenId,string memory madhaar) public view returns(address)   {
 
        address owner1 = landOwner[tokenId];
       // address ownera =adhaarno[madhaar];
      //  require(owner1 != address(0), "ERC721: owner query for nonexistent token");
      //  require (ownera==owner);
        return owner1;
    }

*/
    // this function will transfer the land frond one owner to the another
   



    //conformation of all services
   
   
   

/* function isavailable(uint  tokenId,bool valid)  public{
   

   require (msg.sender==owner(tokenId));
// Citizen memory _post = posts[tokenId];
          
     
          
            
         if(valid)
          {
      
           availables[tokenId] = true;
            posts[tokenId].avail=true;
       }
       else
       {
       availables[tokenId] = false;
     posts[tokenId].avail=false;
       }
      
       
      
         
    }
     
       
  */  
    
        
 /*     
     function waterbill(uint tokenId,bool valid) public
   {
            require (msg.sender==electricity);
     //  Citizen memory _post = posts[tokenId];
           
       
         if(valid)
          {
      
             waterrs[tokenId] = true;
             posts[tokenId].water=true;
       }
       else
       {
       waterrs[tokenId] = false;
        posts[tokenId].water=false;
       }
      
       
    }
    
     function electric(uint  tokenId,bool valid) 
    public
   {
          require (msg.sender==electricity);
       
            //  Citizen memory _post = posts[tokenId];
       
         if(valid)
          {
      
            eleccs[tokenId] = true;
             posts[tokenId].elec=true;
       }
       else
       {
       eleccs[tokenId] = false;
        posts[tokenId].elec=false;
       }
      
    }
    
     function loan(uint  tokenId,bool valid)  public
    {
          require (msg.sender==electricity);
         //Citizen memory _post = posts[tokenId];
      
           
         if(valid)
          {
      
             loanns[tokenId] = true;
             posts[tokenId].bank=true;
       }
       else
       {
        loanns[tokenId] = false;
         posts[tokenId].bank=false;
       }
      

    }
     
*/


function initiatelandtransfer(uint tokenId,string memory village,string memory adhaarbuy) public {
  
        require(villageAdmin[village] == msg.sender );

uint a =mapt[tokenId];
 Citizen memory _post = posts[a];
         
          _post.initiatedwith=adhaarbuy;
          

          posts[a]=_post;
 
         emit PostCreated(_post.adhaarno,_post.fname, _post.initiatedwith, _post.state, _post.district , _post.village,_post.tokenid);

}


     function transfer(uint tokenId,string memory no,string memory fname,string memory village) public {

        require(villageAdmin[village] == msg.sender );

      //require (services[tokenId]);
        
       uint a =mapt[tokenId];
          Citizen memory _post = posts[a];
           _post.fname=fname;
          //  _post.lname=lname;
             _post.adhaarno=no;
           
            

          posts[a]=_post;
 //services[tokenId]=false;
   //checkvalues[mland]=false;
  //  availables[tokenId]=false;
 //   waterrs[tokenId]=false;
  //  eleccs[tokenId]=false;
  //  loanns[tokenId]=false;
         emit PostCreated(_post.adhaarno,_post.fname,"Not available for sale", _post.state, _post.district ,_post.village,_post.tokenid);
    
}

function change(address changee) public {

 require (msg.sender==0x39E79820B097E5c72AF6698D76f8829F2ae38496);


electricity = changee;
  
}




}