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


const PrinterForm = () => {

  const intialValues = { invoice_ip: "", kitchen_ip: "", bar_ip: ""};
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await getRequest(`printer`);
    if (response.data) {
      setFormValues(response.data);
    }
  }

  const updateData = async () => {
    const response = await putRequest(`printer/1`, formValues);
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
    if (!values.invoice_ip) {
      setIsSubmitting(false);
      errors.invoice_ip = "Cannot be blank";
    } 
    if (!values.kitchen_ip) {
      setIsSubmitting(false);
      errors.kitchen_ip = "Cannot be blank";
    } 
    if (!values.bar_ip) {
      setIsSubmitting(false);
      errors.bar_ip = 'Cannot be blank';
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
                  <InputLabel htmlFor="invoice_ip">Invoice Ip*</InputLabel>
                  <OutlinedInput
                    id="invoice_ip"
                    type="text"
                    value={formValues.invoice_ip}
                    onChange={handleChange}
                    name="invoice_ip"
                    placeholder="192.168.1.100"
                  />
                  {formErrors.invoice_ip && (
                    <FormHelperText error id="helper-text-table-invoice_ip">
                      {formErrors.invoice_ip}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">Kitchen Ip*</InputLabel>
                  <OutlinedInput
                    id="kitchen_ip"
                    type="text"
                    value={formValues.kitchen_ip}
                    onChange={handleChange}
                    name="kitchen_ip"
                    placeholder="192.168.1.100"
                  />
                  {formErrors.kitchen_ip && (
                    <FormHelperText error id="helper-text-kitchen_ip">
                      {formErrors.kitchen_ip}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="bar_ip">Bar Ip*</InputLabel>
                  <OutlinedInput
                    id="bar_ip"
                    type="text"
                    value={formValues.bar_ip}
                    onChange={handleChange}
                    name="bar_ip"
                    placeholder="192.168.1.100"
                  />
                  {formErrors.bar_ip && (
                    <FormHelperText error id="helper-text-bar_ip">
                      {formErrors.bar_ip}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Update Printer
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default PrinterForm;
