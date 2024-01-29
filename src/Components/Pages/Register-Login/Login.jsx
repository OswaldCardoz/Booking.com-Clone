import { useContext, useState } from "react";
import RegisterLoginHeader from "./RegisterLoginHeader";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../../App";
import axios from "axios";
import { Button, TextField } from "@mui/material";
function Login(){
    const {setIsLoggedIn} = useContext(AuthContext);

    const [errorMessage, setErrorMessage] = useState(null);
    const [userInfo, setUserInfo] = useState({
      email: '',
      password: '',
    })
  
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const {state} = useLocation();
   
   
  
    const existingUser = async (user) =>{
      
      try {
        const res = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/login', user,  {
            headers: {
              projectID: 'swidhmkjxrdl',
            },
          });
        console.log(res);
        const token = res.data.token;
        console.log(token);
        if(token){
          localStorage.setItem("userToken", token);
          localStorage.setItem('loginUserDetails', JSON.stringify(res.data.data));
          setIsLoggedIn(true);
  
          if(state){
            navigate(state.prevPath, {state:{...location.state}});
          }else{
  
            navigate('/')
          }
  
          
  
          
        }
  
      } catch (error) {
        console.log("error", error);
        try{
        setErrorMessage(error.response.data.message);
        }
        catch(error){
          setErrorMessage(error.message);
        }
      }
       
    }
  
    function handleLoginForm(e){
  
      e.preventDefault();
      // ALL FIELD MUST BE FILLED
      for(let key in userInfo){
        if(userInfo[key] === ''){
          setErrorMessage("All fields must be filled");
          return; // it will return to handleRegisteration form
        }
      }
      const userDetails = {
        email: userInfo.email,
        password: userInfo.password,
        appType: "bookingportals",
      }
      // console.log("userDetails", userDetails);
      existingUser(userDetails);
  
  
    }
  
    function handleInputChange(e){
      const {name, value} = e.target;
      setUserInfo({...userInfo, [name]: value});
      setErrorMessage(null);
    }
  
  
    return (<>

     <section className='login-section'>
     <RegisterLoginHeader/>

  
        <div className='parent-container'>
          {/* <div className='child-container login-form-content'> */}
  
            <form action="" className='login-form' onSubmit={handleLoginForm}>
              <h2>Sign in or create an account</h2>
  
              {errorMessage && <div>
                <p className='error-message'>{errorMessage}</p>
                </div>}
              
              <div>
                {/* <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' onChange={handleInputChange}/> */}
                 <TextField
                type='email'
                id='email'
                name='email'
                label='Email'
                variant='outlined'
                fullWidth
                onChange={handleInputChange}
              />

              </div>
  
              {userInfo.email &&<div>
                {/* <label htmlFor="password">Password</label> */}
                {/* <input type="password" id='password' name='password' onChange={handleInputChange}/> */}
                <TextField
                  type='password'
                  id='password'
                  name='password'
                  label='Password'
                  variant='outlined'
                  fullWidth
                  onChange={handleInputChange}
                />

              </div>}
  
              <div>
              <Button type='submit' variant='contained' color='primary'>
            Sign In
            </Button>
              </div>
  
              <div>
                  <p>Don't have account? <NavLink to='/register' >Create an account</NavLink></p>
              </div>
  
            </form>
          </div>
  
        {/* </div> */}
     </section>
     </>
    )
  }
export default Login;



// import { useContext, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { TextField, Button } from "@mui/material"; // Import TextField and Button from Material-UI
// import RegisterLoginHeader from "./Headers";
// import { AuthContext } from "../../../App"; 

// import axios from "axios";
// import "./login.css";

// function Login(state) {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [userInfo, setUserInfo] = useState({
//     email: '',
//     password: '',
//   });
//   const {setIsLoggedIn} = useContext(AuthContext);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const createUser = async (user) => {
//     try {
//       const res = await axios.post('https://academics.newtonschool.co/api/v1/bookingportals/login', user, {
//         headers:{
//           projectID: 'swidhmkjxrdl',
//         }
//       })
//       console.log(res);
//       const token = res.data.token;
//       console.log(token);
//       if(token){
//         localStorage.setItem("userToken", token);
//         localStorage.setItem('loginUserDetails', JSON.stringify(res.data.data));
//         setIsLoggedIn(true);

//         if(state){
//           console.log(state)
//           navigate(state.prevPath, {state:{...location.state}});
//         }else{

//           navigate('/')
//         }

        

        
//       }

//     } catch (error) {
//       console.log("error", error);
//       try{
//       setErrorMessage(error.response.data.message);
//       }
//       catch(error){
//         setErrorMessage(error.message);
//       }
//     }
     
//   };

//   function handleLoginForm(e) {
//     e.preventDefault();

//     for (let key in userInfo) {
//       if (userInfo[key] === '') {
//         setErrorMessage("All fields must be filled");
//         return;
//       }
//     }

//     const userDetails = {
//       email: userInfo.email,
//       password: userInfo.password,
//       appType: "bookingportals",
//     };

//     createUser(userDetails);
//   }

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setUserInfo({ ...userInfo, [name]: value });
//     setErrorMessage(null);
//   }

//   return (
//     <section className='login-section'>
//       <RegisterLoginHeader />

//       <div className='parent-container'>
//         <div className='child-container login-form-content'>
//           <form action='' className='login-form' onSubmit={handleLoginForm}>
//             <h2>Sign in or create an account</h2>

//             {errorMessage && (
//               <div>
//                 <p className='error-message'>{errorMessage}</p>
//               </div>
//             )}

//             <div>
//               <TextField
//                 type='email'
//                 id='email'
//                 name='email'
//                 label='Email'
//                 variant='outlined'
//                 fullWidth
//                 onChange={handleInputChange}
//               />
//             </div>

//             {userInfo.email && ( // Only show password field if email is entered
//               <div>
//                 <TextField
//                   type='password'
//                   id='password'
//                   name='password'
//                   label='Password'
//                   variant='outlined'
//                   fullWidth
//                   onChange={handleInputChange}
//                 />
//               </div>
//             )}

//             <div>
//               <Button type='submit' variant='contained' color='primary'>
//                 Sign In
//               </Button>
//             </div>

//             <div>
//               <p>
//                 Don't have an account?{' '}
//                 <NavLink to='/register'>Create an account</NavLink>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Login;
