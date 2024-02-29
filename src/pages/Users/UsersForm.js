import { useEffect, useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Box,
  Typography,
  Stack,
  Paper
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { getRequest, postRequest, putRequest } from 'services/apiService';
import { useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { strengthColor, strengthIndicator } from 'utils/password-strength';


const UsersForm = () => {

  const intialValues = { name: "", email: "", phone: "",  address: "", password: "", repassword: ""};
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const params  = useParams()
  const navigate = useNavigate()

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const createData = async () => {
    const response = await postRequest("user", formValues);
    if (response.data) {
      navigate('/users/list')
    }
    else {
      console.log("Internal Server Error")
    }
    setIsSubmitting(false)
  };

  const fetchData = async () => {
    const response = await getRequest(`user/${params.Id}`);
    if (response.data) {
      setFormValues(response.data);
    }
  }

  const updateData = async () => {
    const response = await putRequest(`user/${params.Id}`, formValues);
    if (response.data) {
      navigate('/users/list')
    }
    else {
      console.log("Internal Server Error")
    }
    setIsSubmitting(false)
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormErrors(validate(formValues));
    };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      setIsSubmitting(false);
      errors.name = "Cannot be blank";
    }
    if (!values.email) {
      setIsSubmitting(false);
      errors.email = 'Cannot be blank';
    }
    if (!Number.isInteger(Number(values.phone))) {
      setIsSubmitting(false);
      errors.phone = 'Cannot be string';
    }
    if (!values.password) {
      setIsSubmitting(false);
      errors.password = 'Cannot be blank';
    } 
    if (!values.repassword) {
      setIsSubmitting(false);
      errors.repassword = 'Cannot be blank';
    } else if(values.password !== values.repassword) {
      setIsSubmitting(false);
      errors.repassword = 'Password is not same';
    }
    return errors;
  };  

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
        if ( params.Id > 0 ) {
          updateData();
        } else {
          createData();
        }
      }
    }, [formErrors]);

    useEffect(()=>{
      if( params.Id > 0 ){
        fetchData()
      }
    },[params])

  return (
    <>
      <Paper elevation={3} style={{ padding: 20 }}>
           <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="table-name">Name*</InputLabel>
                  <OutlinedInput
                    id="table-name"
                    type="text"
                    value={formValues.name}
                    onChange={handleChange}
                    name="name"
                    placeholder="Customers Name"
                  />
                  {formErrors.name && (
                    <FormHelperText error id="helper-text-table-name">
                      {formErrors.name}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Email*</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="text"
                    value={formValues.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="mgmg@gmail.com"
                  />
                  {formErrors.email && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Phone</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="text"
                    value={formValues.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="262253433"
                  />
                  {formErrors.phone && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.phone}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Address</InputLabel>
                  <OutlinedInput
                    id="address"
                    type="text"
                    value={formValues.address}
                    onChange={handleChange}
                    name="address"
                    placeholder="Address"
                  />
                  {formErrors.address && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.address}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Password*</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formValues.password}
                    name="password"
                    onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>{setShowPassword(!showPassword)}}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                  {formErrors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {formErrors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-signup">Re Password*</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showRePassword ? 'text' : 'password'}
                    value={formValues.repassword}
                    name="repassword"
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={()=>{setShowRePassword(!showRePassword);}}
                          edge="end"
                          size="large"
                        >
                          {showRePassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                  />
                  {formErrors.repassword && (
                    <FormHelperText error id="helper-text-password-signup">
                      {formErrors.repassword}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {params.Id > 0 ? "Update User":"Create User"}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default UsersForm;
