import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps=state=>{
    return{
        token:state.token
    }
}


const PrivateRoutes = (props) => {
    const [authenticated, setAuthenticated] = useState(null); // Initial state should be null

    useEffect(() => {
        // You might want to add some async operation here if isAuthenticated is async
        const checkAuth = () => {
            if (props.token) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        };

        checkAuth(); // Perform authentication check
    }, []);


    if (authenticated === null) {
        // Optionally, render a loading spinner or something similar
        return <div>Loading...</div>;
    }

    return authenticated ? <Outlet /> : <Navigate to='/login' replace/>;
};

export default connect(mapStateToProps)(PrivateRoutes)