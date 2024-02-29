import { useEffect, useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Paper
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { getRequest, putRequest } from 'services/apiService';
import { useNavigate } from 'react-router-dom';


const ShopForm = () => {

  const intialValues = { name: "", address: "", phone: "", open_time: "", close_time: ""};
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await getRequest(`shop/1`);
    if (response.data) {
      setFormValues(response.data);
    }
  }

  const updateData = async () => {
    const response = await putRequest(`shop/1`, formValues);
    if (response.data) {
      navigate('/settings/all')
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
    if (!values.address) {
      setIsSubmitting(false);
      errors.description = "Cannot be blank";
    } 
    if (!values.phone) {
      setIsSubmitting(false);
      errors.status = 'Cannot be blank';
    }
    return errors;
  };  

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
          updateData();
      }
    }, [formErrors]);

    useEffect(()=>{
        fetchData()
    },[])

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
                  <InputLabel htmlFor="description">Phone*</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="text"
                    value={formValues.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="09 232323223"
                  />
                  {formErrors.description && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.description}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address">Address*</InputLabel>
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
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="open_time">Open Time</InputLabel>
                  <OutlinedInput
                    id="open_time"
                    type="time"
                    value={formValues.open_time.trim().slice(0, 5)}
                    onChange={handleChange}
                    name="open_time"
                  />
                  {formErrors.open_time && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.open_time}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="close_time">Close Time</InputLabel>
                  <OutlinedInput
                    id="close_time"
                    type="time"
                    value={formValues.close_time.trim().slice(0, 5)}
                    onChange={handleChange}
                    name="close_time"
                  />
                  {formErrors.close_time && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.close_time}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Update Shop
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default ShopForm;
