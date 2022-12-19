import { Avatar, TextF, TextFieldield } from "@mui/material";
import { useEffect, useContext, useState} from "react";
import { FormControl } from "react-bootstrap";
import { UserContext } from "../components/UserContext";


function MyAccount(props) {

    const { loggedIn } = UserContext;



    const [ userDetails, setUserDetails ] = useState();


    useEffect(
        function() {

            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`,
                {
                    'method': 'POST',
                    'headers': {
                        'Authorization': `Bearer ${localStorage.getItem('jsonwebtoken')}`
                    },
                    // 'body': {}
                }
            )
            // This will recieve string data and convert to json
            .then(
                function(backendReponse) {
                    return backendReponse.json()
                }
            )
            // This will receie the converted json
            .then(
                function(jsonResponse) {
                    setUserDetails(jsonResponse);
                }
            )
            // This will catch errors if any
            .catch(
                function(backendError) {
                    console.log('backendError', backendError)
                }
            )
        },

        // This array is empty because useEffect will run once only
        []
    );


    if( userDetails ) {
        return (
            <FormControl>
                <Avatar>Avatar: {userDetails.avatar}</Avatar>
                <TextField>Firstname: {userDetails.firstName}</TextField>
                <TextField>Lastname: {userDetails.lastName}</TextField>
                <TextField>Email: {userDetails.email}</TextField>
                <TextField>Password: </TextField>
            </FormControl>
        )
    } else {
        return(
            <p>Loading...</p>
        )
    }
}

export default MyAccount;