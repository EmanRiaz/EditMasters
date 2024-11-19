import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

export const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState(null);

    const params = useParams();
    const { authorizationToken } = useAuth();

    // Get single user data 
    const getSingleUserData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            console.log(`User single data: ${JSON.stringify(userData)}`);
            setData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load user data. Please try again.');
        }
    };

    useEffect(() => {
        getSingleUserData();
    }, [params.id, authorizationToken]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authorizationToken}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            alert('User data updated successfully!');
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Failed to update user data. Please try again.');
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update User Data</h1>
            </div>
            <div className="container grid grid-two-cols">
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.username}
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
                                value={data.email}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">Mobile no</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <button type="submit">Update</button>
                        </div>
                    </form>
                    {error && <p className="error">{error}</p>}
                </section>
            </div>
        </section>
    );
};
