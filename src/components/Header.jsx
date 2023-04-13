import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Header = () => {

    const { isAuthenticated, setIsAuthenticated , loading ,setLoading} = useContext(Context)

    const logoutHandler = async () => {
        setLoading(true);
        try {
           await axios.get(`${server}/users/logout`,
                {
               withCredentials: true,
            });

            toast.success("Logout Successfully");
            setIsAuthenticated(false)
            setLoading(false);

        } catch (error) {
            toast.error("Logout Failed")
            setIsAuthenticated(true)
            setLoading(false);


        }
    };


    return (

        <nav className="header">
            <div>
                <h2>Todo App.</h2>
            </div>
            <article>
                <Link to={'/'}>Home</Link>
                <Link to={'/profile'}>Profile</Link>
                {/* <Link to={'/login'}>Login</Link> */}

                {
                    isAuthenticated ? (<button disabled={loading} onClick={logoutHandler} className='btn' >LogOut</button>)
                        : (<Link to={'/login'}>Login</Link>)

                }

            </article>
        </nav>
    );
}

export default Header;