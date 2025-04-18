import React, { useEffect, useState } from 'react';
import {Box,Typography,Button,Paper,} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { URLS } from '../../../Service/URLS';
import { getAllUsers } from '../../../Service/CommonService';
import { useNavigate } from 'react-router-dom';
import { getUserTableColumns } from './config/UserTableConfig.jsx';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = useSelector((state) => state.user.Role);
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/dashboard/UserManagement/add');
  };

  const handleEditUser = (user) => {
    navigate(`/dashboard/UserManagement/add/${user.id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(URLS.GetUsers);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = getUserTableColumns(role, handleEditUser);

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600} color="primary">
          User Management
        </Typography>
        {role === 'ADMIN' && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleAddUser}
            sx={{ textTransform: 'none', borderRadius: '8px' }}
          >
            + Add New User
          </Button>
        )}
      </Box>

      <Paper
        elevation={3}
        sx={{
          height: 520,
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          loading={loading}
          getRowId={(row) => row.id}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#F5FAFF',
            },
            '& .super-app-theme--header': {
              backgroundColor: '#F0F6FF',
              fontWeight: 600,
              fontSize: '14px',
              color: '#1E293B',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserManagement;
