import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useContext, useState, useRef} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem} from 'mdb-react-ui-kit';
  import Accordion from 'react-bootstrap/Accordion';
  import { UserContext } from '../components/UserContext';



function ProfileScreen(props) {

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
                }
            )
            .then(
                function(backendReponse) {
                    return backendReponse.json()
                }
            )
            .then(
                function(jsonResponse) {
                    setUserDetails(jsonResponse);
                }
            )
            .catch(
                function(backendError) {
                    console.log('backendError', backendError)
                }
            )
        },

        []
    );


    if (userDetails){

    return (
    <section style={{ backgroundColor: '#eee' }}>

        {/* lil navbar */}
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>


        {/* card with avatar */}
        <MDBRow>
          <MDBCol lg="3">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={userDetails.avatar}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <li className="text-muted mb-1">{userDetails.firstName}</li>
                <li className="text-muted mb-4">{userDetails.address}</li>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline className="ms-1">Update</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>


            {/* lil idk */}
                <Accordion>
                    <Accordion.Item eventKey="0">
                         <Accordion.Header>Frequent question #1</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Frequent question #2</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet
                            </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Frequent question #3</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet
                            </Accordion.Body>
                    </Accordion.Item>

                    </Accordion>


           
          </MDBCol>


             {/* lil card for update */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Firstame</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.firstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Lastname</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDetails.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}
   //Loading
    else{
        return(
            <p>Loading...</p>
        )
    }
}

export default ProfileScreen;
