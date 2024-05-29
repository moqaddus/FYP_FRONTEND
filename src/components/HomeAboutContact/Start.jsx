import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Start(){
  const history=useHistory();


  useEffect(() => {
    // Fetch token from local storage once when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken=jwtDecode(storedToken);
      const {type,username}=decodedToken;
      if(type==='PlatformUser')
        {
          history.push({
            pathname: "/userProfile",
            state: { userName: username }
            
        })
        }
      else if(type==='OrgAdmin')
        {
          history.push({
            pathname: "/orgProfile",
            state: { userName: username }
        })
        }
        else if(type=='PlatformAdmin')
          {
            history.push({
              pathname: "/admin"});
          }
    }
    else{
      history.push({
        pathname: "/home"});
    }
    
  }, []);
  
  return(
    <div>
    <h1 className="mt-[200px] mb-[200px] text-center"> No token Present  </h1>
  </div>
  )
  
  
}

export default Start;