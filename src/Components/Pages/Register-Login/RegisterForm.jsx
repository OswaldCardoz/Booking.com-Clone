// import React, { useContext, useRef, useState } from 'react'
// import './RegisterForm.css';
// import { NavLink, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import { AuthContext } from '../App';

// function RegisterForm({state}){
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
// //   const {setIsLoggedIn} = useContext(AuthContext);
  
//   const [userInfo, setUserInfo] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })

//   const createUser = async (user) =>{
//     try {
//       const res = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/signup',user,
//       {
//         headers: {
//           projectID: 'swidhmkjxrdl',
//         },
//       }
//     );
//       console.log(res);
//       const token = res.data.token;
//       console.log(token);
//       if(token){
//         localStorage.setItem("userToken", token);
//         localStorage.setItem('loginUserDetails', JSON.stringify(res.data.data.user));
//         setIsLoggedIn(true);
//           navigate('/')
        
//       }

//     } catch (error) {
//       console.log("error", error);
//       setErrorMessage(error.response.data.message);
//     }
     
//   }

//   function handleRegisterForm(e){
//     e.preventDefault();

//     // ALL FIELD MUST BE FILLED
//     for(let key in userInfo){
//       if(userInfo[key] === ''){
//         setErrorMessage("All fields must be filled");
//         return; // it will return to handleRegisteration form
//       }
//     }
   

//     const userDetails = {
//       name: userInfo.username.toUpperCase(),
//       email: userInfo.email,
//       password: userInfo.password,
//       appType: "bookingportals",
//     }
//     console.log("userDetails", userDetails);
//     createUser(userDetails);


//   }

//   function handleInputChange(e){
//     const {name, value} = e.target;
    
//     const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;
//     if(name == 'firstname' || name == 'lastname'){
//          if(regex.test(value)){
//            return;
//          }
//     }
//     setUserInfo({...userInfo, [name]: value});
//     setErrorMessage(null);
//   }


//   return (
//     <div className='parent-container'>
//         <div className='child-container register-form-content'>

//           <form action="" className='register-form' onSubmit={handleRegisterForm}>
//             <h2>Sign in or create an account</h2>

//              {errorMessage && <div>
//               <p className='error-message'>{errorMessage}</p>
//               </div>}
//             <div>
//               <label htmlFor="firstname">User Name</label>
//               <input type="text" id='firstname' name='firstname' value={userInfo.username}  onChange={handleInputChange} />
//             </div>

//             {/* <div>
//               <label htmlFor="lastname">Last Name</label>
//               <input type="text" id='lastname' name='lastname' value={userInfo.lastname} onChange={handleInputChange} />
//             </div> */}
            
//             <div>
//               <label htmlFor="email">Email</label>
//               <input type="email" id='email' name='email' value={userInfo.email}  onChange={handleInputChange} />
//             </div>

//             <div>
//               <label htmlFor="password">Password</label>
//               <input type="password" id='password' name='password' value={userInfo.password} onChange={handleInputChange} />
//             </div>

//             <div>
//                <input type="submit" value="Sign Up" />
//             </div>

//             <div>
//                 <p>Already have an account? <NavLink to='/login'>Login now</NavLink></p>
//             </div>

//           </form>
//         </div>

//       </div>
//   )
// }
// export default RegisterForm;


import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material'; // Import TextField and Button from Material-UI
import axios from 'axios';
// import { AuthContext } from '../App';
import './RegisterForm.css';
import { AuthContext } from '../../../App';

function RegisterForm({ state }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const createUser = async (user) => {
    try {
      const res = await axios.post(
        'https://academics.newtonschool.co/api/v1/bookingportals/signup',
        user,
        {
          headers: {
            projectID: 'swidhmkjxrdl',
          },
        }
      );
      console.log(res);
      const token = res.data.token;
      console.log(token);
      if (token) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('loginUserDetails', JSON.stringify(res.data.data.user));
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
      setErrorMessage(error.response.data.message);
    }
  };

  function handleRegisterForm(e) {
    e.preventDefault();

    // ALL FIELD MUST BE FILLED
    for (let key in userInfo) {
      if (userInfo[key] === '') {
        setErrorMessage('All fields must be filled');
        return; // it will return to handleRegisteration form
      }
    }

    const userDetails = {
      name: userInfo.username.toUpperCase(),
      email: userInfo.email,
      password: userInfo.password,
      appType: 'bookingportals',
    };
    console.log('userDetails', userDetails);
    createUser(userDetails);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?/\\|`~0-9]/;
    if (name === 'firstname' || name === 'lastname') {
      if (regex.test(value)) {
        return;
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
    setErrorMessage(null);
  }

  return (
    <div className='parent-container'>
      {/* <div className='child-container register-form-content'> */}
        <form action='' className='register-form' onSubmit={handleRegisterForm}>
          <h2>Sign in or create an account</h2>

          {errorMessage && (
            <div>
              <p className='error-message'>{errorMessage}</p>
            </div>
          )}

          <div>
            <TextField
              type='text'
              id='firstname'
              name='username'
              label='User Name'
              variant='outlined'
              fullWidth
              value={userInfo.username}
              onChange={handleInputChange}
            />
          </div>

          {/* <div>
            <TextField
              type='text'
              id='lastname'
              name='lastname'
              label='Last Name'
              variant='outlined'
              fullWidth
              value={userInfo.lastname}
              onChange={handleInputChange}
            />
          </div> */}

          <div>
            <TextField
              type='email'
              id='email'
              name='email'
              label='Email'
              variant='outlined'
              fullWidth
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <TextField
              type='password'
              id='password'
              name='password'
              label='Password'
              variant='outlined'
              fullWidth
              value={userInfo.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Button type='submit' variant='contained' color='primary'>
              Sign Up
            </Button>
          </div>

          <div>
            <p>
              Already have an account? <NavLink to='/login'>Login now</NavLink>
            </p>
          </div>
        </form>
      </div>
    // </div>
  );
}

export default RegisterForm;
