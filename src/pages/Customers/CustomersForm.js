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
import { getRequest, postRequest, putRequest } from 'services/apiService';
import { useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';


const CustomersForm = () => {

  const intialValues = { name: "", address: "", phone: ""};
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const params  = useParams()
  const navigate = useNavigate()

  const createData = async () => {
    const response = await postRequest("customer", formValues);
    if (response.data) {
      navigate('/customers/list')
    }
    else {
      console.log(response)
    }
    setIsSubmitting(false)
  };

  const fetchData = async () => {
    const response = await getRequest(`customer/${params.Id}`);
    if (response.data) {
      setFormValues(response.data);
    }
  }

  const updateData = async () => {
    const response = await putRequest(`customer/${params.Id}`, formValues);
    if (response.data) {
      navigate('/customers/list')
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
    if (!values.phone) {
      setIsSubmitting(false);
      errors.phone = 'Please select a status';
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
                  <InputLabel htmlFor="description">Phone*</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="text"
                    value={formValues.phone}
                    onChange={handleChange}
                    name="phone"
                    placeholder="09 232323223"
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
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {params.Id > 0 ? "Update Customer":"Create Customer"}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default CustomersForm;
