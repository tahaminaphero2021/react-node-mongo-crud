import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    //state ta objects
    const[user, setUser] = useState({});
    //read params
    const{id} = useParams();
  //dynamic load single item by id & display the user info;get this
    useEffect(() =>{
  const url= `http://localhost:5000/users/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => setUser(data));
  
    }, []);
//Update user
const handleNameChange =e => {
  const updatedName = e.target.value;
  const updatedUser = { name: updatedName, email: user.email };
  setUser(updatedUser);
}
const handleEmailChange = e => {
  const updatedEmail = e.target.value;
  const updatedUser = { name: user.name, email: updatedEmail  };
  setUser(updatedUser);

  // const updatedUser = {...user};
  // updatedUser.email = updatedEmail;
}
    const handleUpdateUser = e =>{
      const url= `http://localhost:5000/users/${id}`;
      fetch(url, {
        method:'PUT',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if(data.modifiedCount > 0){
          alert('Updated Successfully!wow,great!')
          //clear the input field
          setUser({});
        }
      })
      e.preventDefault();
    }
    return (
        <div>
            <h2> Update: {user.name} {user.email}</h2>
            <p><small>Id: {id}</small></p>
            <form onSubmit={handleUpdateUser}>
              <input type="text" onChange={handleNameChange} value={user.name || ''} />
              <input type="email" onChange={handleEmailChange} value={user.email || ''} />
              <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;