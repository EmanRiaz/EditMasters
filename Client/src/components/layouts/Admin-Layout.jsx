import { NavLink, Outlet ,Navigate } from "react-router-dom";
import { FaUser,FaHome } from "react-icons/fa";
import{FaMessage} from "react-icons/fa6";
import {useAuth} from "../../store/auth";
export const AdminLayout=()=>{
  const {user,isLoading}=useAuth();
  console.log("admin layout", user);
  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!user.isAdmin){
 return <Navigate to="/login" />
  }
return <>
  <header>
    <div className="container">
        <nav>
            <ul>
            <li>
                <NavLink to="/"><FaHome/> Home</NavLink>
              </li>
            <li>
                <NavLink to="/admin/users"><FaUser/> Users</NavLink>
              </li>
              <li>
                <NavLink to="/admin/admintoken"><FaMessage/> Push Notifications</NavLink>
              </li>            
             
            </ul>
        </nav>
    </div>
  </header>
  <Outlet/>


</>
};