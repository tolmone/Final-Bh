import React from 'react';
import { Steps } from 'antd';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GetLocation from '../components/GetLocation';
import LocationTab from '../components/LocationTab';
import DateandTime from './DateandTime'; 
import Dropdown from './Dropdown';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { green } from '@mui/material/colors';
import { UserContext } from '../components/UserContext';
import Alert from 'react-bootstrap/Alert';








function DonateScreen() {

    const { loggedIn } = React.useContext(UserContext)
    const [open, setOpen] = React.useState(true);
    const { Step } = Steps;
    

    if (loggedIn){
    return (

        <div className='container'>
            
            <Tabs
                defaultActiveKey="profile"
                id="fill-tab-example"
                className=" bg-light mt-5 mb-3 justify"
                fill
            >
                

                
                <Tab eventKey="category" title="Category">
                    <h3 className='mt-5 text-center'>Pick your donation items: </h3>
                    <div className='container justify-content-evenly d-flex'>
                        <Dropdown />
                    </div>
                </Tab>
                

                <Tab eventKey="collection" title="Collection">
                    {/* <Sonnet /> */}
                    <div className='mb-5 mt-5 text-center'>
                        <h3 className='mb-3'>Schedule a date and time to collect the items: </h3>
                        <p className='mb-5'>Please select a convenient slot</p>
                        <DateandTime />
                   </div>
                </Tab>

                <Tab justify eventKey="location" title="Location">
                    <LocationTab />
                </Tab>

                <Tab eventKey="booking" title="Booking">
                    {/* <Sonnet /> */}
                    <div className="justify-content-center text-center">
                        <h2 className='mt-5'>Success</h2>
                        <CheckCircleOutlinedIcon sx={{ color: green[500], fontSize: 200 }}/>     
                        <h4 className='mt-2 mb-4'>Thank you!</h4>   
                        <p>Your booking has been confirmed.</p>
                        <p> We'll see you soon!</p>
                    </div>        
                </Tab>

            </Tabs>
        </div>

    );}
    else{
        return(
            <>
      {[
        'primary'
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          If you want to donate{' '}
          <Alert.Link href="/login">login</Alert.Link> here.
        </Alert>
      ))}
    </>
        )
    }
}

export default DonateScreen;
