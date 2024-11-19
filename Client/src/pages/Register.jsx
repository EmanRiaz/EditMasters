import { useState } from "react";
import { useNavigate}from"react-router-dom";
import{useAuth} from "../store/auth";
import{toast} from "react-toastify";

const URL="http://localhost:5000/api/auth/register"
export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("response data : ", response);
      
      const res_data = await response.json();
        console.log("res from server",res_data.extraDetails);

      if (response.ok) {
        
        //stored the token in localhost
       storeTokenInLS(res_data.token);
        
        
        alert("registration successful");
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
       navigate("/dashboard")
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      } 
    } catch (error) {
      console.error("Error", error);
    }
  };


  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="image  missing "
                  width="500"
                  height="500"
                />
              </div>

    
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label  className="input" htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label   className="input" htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label  className="input" htmlFor="phone">Phone No</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label className="input"  htmlFor="password">Password</label>
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
                    Register Now
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