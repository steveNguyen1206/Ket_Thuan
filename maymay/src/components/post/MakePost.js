import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import MakePostForm1 from './MakePostForm1';
// import MakePostForm_2 from './MakePostForm_2';
// import ReviewPost from './ReviewPost';

import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'ReviewPost your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MakePostForm1 />;
//     case 1:
//       return <MakePostForm_2 />;
//     case 2:
//       return <ReviewPost />;
    default:
      throw new Error('Unknown step');
  }
}

export default function MakePost() {
  let navigate = useNavigate();
  const { isLoggedIn} = useSelector((state) => state.auth);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}



      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ 
            my: { xs: 3, md: 6 }, 
            p: { xs: 2, md: 3 }, 
            borderRadius: 4 }}>
          <Typography component="h1" variant="h4" align="center">
            Make yourself
          </Typography>

            <Box component="form" noValidate autoComplete='off' >
                <MakePostForm1 />
            </Box>

          {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )} */}



             

        </Paper>
      </Container>
    </React.Fragment>
  );
}