import { useState } from "react";
import {useAuth} from "../store/auth";
const defaultContactFormData={
  username:"",
  email:"",
  message:"",
};
export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [userData,setUserData]=useState(true);
  const {user}=useAuth();
  if(userData && user){
    setContact({
      username:user.username,
      email:user.email,
      message:"",
    });
    setUserData(false);
  }

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle fomr getFormSubmissionInfo
  const handleSubmit = async (e) => {
    e.preventDefault();

   // console.log(contact);
   try{
    const response=await fetch ("http://localhost:5000/api/form/contact",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(contact),
    });
     if(response.ok){
      setContact(defaultContactFormData);
      const data=await response.json();
      console.log(data);
      alert("Message send successfully");
     }
   }catch(error){
    alert("Message not send ");
    console.log(error);
   }
  };



  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="image" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="message-container">
      <label htmlFor="message" className="message-label">Message</label>
      <textarea
        name="message"
        id="message"
        autoComplete="off"
        value={contact.message}
        onChange={handleInput}
        required
        cols="30"
        rows="6"
      ></textarea>
    </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

       
      </section>
    </>
  );
};