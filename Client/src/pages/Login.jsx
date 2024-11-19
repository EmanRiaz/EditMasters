import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import{toast} from "react-toastify";
const URL="http://localhost:5000/api/auth/login"

export const Login = () => {
  const [user, setUser] = useState({
    
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const {storeTokenInLS}=useAuth();
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  
  
    // handle form on submit
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        console.log("login form",response);
        const res_data = await response.json();
  
         if (response.ok){
  
          storeTokenInLS(res_data.token);
         
          setUser({email:"",password:""});
          toast.success("Login successful");
  
          navigate("/dashboard");
  
        }
        else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
          alert("Invalid credentials: " + (errorData.message || response.statusText));

          console.log("Invalid credentials:", errorData);
        }
      } catch (error) {
        console.log("Error during login:", error);
      }
    };
    

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image reg-img">
                <img
                  src="/images/login.png"
                  alt="image  missing "
                  width="500"
                  height="500"
                />
              </div>
              {/* our main login code  */}
             <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
               
                  <div>
                    <label  className="input"htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                
                  <div>
                    <label className="input" htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" >
                    Login Now
                  </button>
                </form>
               
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
