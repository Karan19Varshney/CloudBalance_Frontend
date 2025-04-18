
import React, { useEffect, useState } from 'react';
import {Box,Button,TextField,Typography,} from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { postApi, getApi, putApi } from '../../../../Service/CommonService';
import { URLS } from '../../../../Service/URLS';
import {
  roles,
  renderRoleSelect,
  renderAccountSelector,
} from '../config/UserFormConfig.jsx';

const AddUser = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    accountIds: [],
  });

  const [availableAccounts, setAvailableAccounts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getApi(`${URLS.GetUserById}/${id}`);
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
          role: user.role,
          accountIds: user.accountIds || [],
        });
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    if (isEdit) {
      fetchUserData();
    }
  }, [id]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const account = await getApi(URLS.GetAccounts);
        setAvailableAccounts(account);
      } catch (err) {
        console.error('Error fetching accounts:', err.message);
      }
    };

    if (formData.role === 'CUSTOMER') {
      fetchAccounts();
    } else {
      setAvailableAccounts([]);
      setFormData((prev) => ({ ...prev, accountIds: [] }));
    }
  }, [formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccountChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      accountIds: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await putApi(`${URLS.UpdateUser}/${id}`, formData);
      } else {
        await postApi(URLS.CreateUser, formData);
      }
      navigate('/dashboard/UserManagement');
    } catch (err) {
      console.error('Error saving user:', err.message);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        {isEdit ? 'Edit User' : 'Add New User'}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!isEdit}
        />

        {renderRoleSelect(formData.role, handleChange)}

        {formData.role === 'CUSTOMER' &&
          renderAccountSelector(
            formData.accountIds,
            handleAccountChange,
            availableAccounts
          )}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEdit ? 'Update User' : 'Submit'}
          </Button>
          <Button
            component={Link}
            to="/dashboard/UserManagement"
            variant="outlined"
            color="secondary"
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default AddUser;
