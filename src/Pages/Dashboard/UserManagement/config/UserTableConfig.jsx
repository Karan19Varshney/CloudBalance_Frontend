// src/pages/UserManagement/config/userTableConfig.js

import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const getUserTableColumns = (role, handleEditUser) => {
  const baseColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'name',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      minWidth: 200,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      minWidth: 130,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: '#E0F2FF',
            color: '#1976D2',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      flex: 1.2,
      minWidth: 180,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleString() : '---',
    },
  ];

  if (role === 'ADMIN') {
    baseColumns.push({
      field: 'edit',
      headerName: 'Edit',
      width: 90,
      sortable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Tooltip title="Edit User" arrow>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEditUser(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    });
  }

  return baseColumns;
};
