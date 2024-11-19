import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import {Link } from"react-router-dom";
export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
               method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`users ${JSON.stringify(data)}`);
            setUsers(data);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };
    //delete the user on clicking on delete button
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {

            method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });
    
            if (!response.ok) {
             getAllUsersData()
            }
    
            const data = await response.json();
            console.log(`users after delete: ${data}`);
    
            // Update state by filtering out the deleted user
            setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
    
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };
    

    useEffect(() => {
        getAllUserData();
    }, [authorizationToken]);
/*
    return (
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
    {users.map((curUser) => (
        <tr key={curUser._id}>
            <td>{curUser.username}</td>
            <td>{curUser.email}</td>
            <td>{curUser.phone}</td>
            <td>
    <Link to={`/admin/users/${curUser._id}`}>Edit</Link>
</td>

            <td>
                <button onClick={() => deleteUser(curUser._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>
                </table>
            </div>
        </section>
    );
};*/
return (
    <section className="admin-users-section">
        <div className="container">
            <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((curUser) => (
                        <tr key={curUser._id}>
                            <td>{curUser.username}</td>
                            <td>{curUser.email}</td>
                            <td>{curUser.phone}</td>
                            <td>
                                <Link to={`/admin/users/${curUser._id}`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => deleteUser(curUser._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);
};

