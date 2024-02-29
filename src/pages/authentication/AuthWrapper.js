import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import AuthBackground from 'assets/images/auth/AuthBackground';
import Notification from 'components/Notification';

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
    <AuthBackground />
    <Grid
      container
      direction="column"
      // justifyContent="flex-end"
      // sx={{
      //   minHeight: '100vh'
      // }}
    >
      <Grid container xs={12}>
        <Grid item xs={9} sx={{ ml: 3, mt: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={3} sx={{position: 'absolute',top: '20px',right: '10px'}}>
          <Notification />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
