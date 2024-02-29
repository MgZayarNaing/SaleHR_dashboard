import { useEffect, useState } from 'react';
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Paper,
  MenuItem, 
  Select
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { getRequest, postRequest } from 'services/apiService';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';


const UserRole = () => {

  const intialValues = {};

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [role, setRole] = useState([])
  const [user, setUser] = useState([])
  
  const navigate = useNavigate()

  const createData = async () => {
    const response = await postRequest("user/assign-role", formValues);
    if (response.data) {
      navigate('/users/list')
    }
    setIsSubmitting(false)
  };

  const fetchUser = async () => {
    const response = await getRequest('user');
    if (response.data) {
        setUser(response.data);
        console.log(response.data)
    }
  }

  const fetchRole = async () => {
    const response = await getRequest('auth/role');
    if (response.data) {
        setRole(response.data);
        console.log(response.data)
    }
  }

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues)
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setFormErrors(validate(formValues));
  };

  const validate = (values) => {
    let errors = {};
    if (!values.user_id) {
      setIsSubmitting(false);
      errors.name = "Cannot be blank";
    } 
    if (!values.role) {
      setIsSubmitting(false);
      errors.status = 'Please select a status';
    }
    return errors;
  };  

    useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmitting) {
          createData();
      }
    }, [formErrors]);

    useEffect(()=>{
        fetchUser()
        fetchRole()
    },[])

  return (
    <>
      <Paper elevation={3} style={{ padding: 20 }}>
           <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="user_id">User</InputLabel>
                  <Select
                    label="User"
                    id="user_id"
                    value={formValues.user_id}
                    onChange={handleChange}
                    name="user_id"
                  >
                    {user.map((u,index)=>(
                        <MenuItem key={index} value={u.id}>{u.name}</MenuItem>
                    ))}
                  </Select>
                  {formErrors.user_id && (
                    <FormHelperText error id="helper-text-user_id">
                      {formErrors.user_id}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Select
                    label="Role"
                    id="role"
                    value={formValues.role}
                    onChange={handleChange}
                    name="role"
                  >
                    {role.map((r,index)=>(
                        <MenuItem key={index} value={r.name}>{r.name}</MenuItem>
                    ))}
                  </Select>
                  {formErrors.role && (
                    <FormHelperText error id="helper-text-role">
                      {formErrors.role}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Assign Role
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </>
  );
};

export default UserRole;
