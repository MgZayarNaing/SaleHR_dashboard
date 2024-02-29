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
import { getRequest, postRequest } from 'services/apiService';
import { useNavigate, useParams } from 'react-router-dom';


const DrinkInventory = () => {

  const [qty, setQty] = useState("")
  const [name, setName] = useState("")
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const params  = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await getRequest(`product/${params.Id}`);
    if (response.data) {
      setName(response.data.name)
      setQty(response.data.qty)
    }
  }

  const updateData = async () => {
    const response = await postRequest(`product/${params.Id}`, {qty:qty});
    if (response.data) {
      navigate('/products/drink/list')
    }
    else {
      console.log("Internal Server Error")
    }
    setIsSubmitting(false)
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormErrors(validate(qty));
  };

  const validate = (qty) => {
    let errors = {};
    if (!qty) {
      setIsSubmitting(false);
      errors.qty = 'Cannot be blank';
    }
    return errors;
  };

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
        if ( params.Id > 0 ) {
          updateData();
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
                    value={name}
                    name="name"
                    placeholder="TU-1"
                    readOnly={true}
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
                  <InputLabel htmlFor="qty">Qty*</InputLabel>
                  <OutlinedInput
                    id="qty"
                    type="number"
                    value={qty}
                    onChange={(e)=>setQty(e.target.value)}
                    name="qty"
                    placeholder="3500"
                  />
                  {formErrors.qty && (
                    <FormHelperText error id="helper-text-description">
                      {formErrors.qty}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {params.Id > 0 ? "Update Table":"Create Table"}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default DrinkInventory;
