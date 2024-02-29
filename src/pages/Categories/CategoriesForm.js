import { useEffect, useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  MenuItem,
  Select,
  Paper
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { getRequest, postRequest, putRequest } from 'services/apiService';
import { useNavigate, useParams } from '../../../node_modules/react-router-dom/dist/index';


const CategoriesForm = () => {

  const intialValues = { name: "", status: "ACTIVE"};
  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const params  = useParams()
  const navigate = useNavigate()

  const createData = async () => {
    const response = await postRequest("category", formValues);
    if (response.data) {
      navigate('/categories/list')
    }
    else {
      console.log("Internal Server Error")
    }
    setIsSubmitting(false)
  };

  const fetchData = async () => {
    const response = await getRequest(`category/${params.Id}`);
    if (response.data) {
      setFormValues(response.data);
      console.log(response.data)
    }
  }

  const updateData = async () => {
    const response = await putRequest(`category/${params.Id}`, formValues);
    if (response.data) {
      navigate('/categories/list')
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
    if (!values.status) {
      setIsSubmitting(false);
      errors.status = 'Please select a status';
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
                    placeholder="Category"
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
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  label="Status"
                  id="status"
                  value={formValues.status}
                  onChange={handleChange}
                  name="status"
                >
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="DISABLE">Disable</MenuItem>
                </Select>
                {formErrors.status && (
                  <FormHelperText error id="helper-text-status">
                    {formErrors.status}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {params.Id > 0 ? "Update Category":"Create Cateory"}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default CategoriesForm;
