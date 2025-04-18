import {Checkbox,FormControl,InputLabel,ListItemText,MenuItem,OutlinedInput,Select,TextField} from '@mui/material';
  

  export const roles = ['ADMIN', 'READ_ONLY', 'CUSTOMER'];
  export const renderRoleSelect = (value, handleChange) => (
    <FormControl fullWidth required>
      <InputLabel>Role</InputLabel>
      <Select
        name="role"
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label="Role" />}
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  export const renderAccountSelector = (selectedIds, handleChange, availableAccounts) => (
    <FormControl fullWidth>
      <InputLabel>Assign Accounts</InputLabel>
      <Select
        multiple
        value={selectedIds}
        onChange={handleChange}
        input={<OutlinedInput label="Assign Accounts" />}
        renderValue={(selected) =>
          availableAccounts
            .filter((acc) => selected.includes(acc.id))
            .map((acc) => acc.name)
            .join(', ')
        }
      >
        {availableAccounts.map((account) => (
          <MenuItem key={account.id} value={account.id}>
            <Checkbox checked={selectedIds.includes(account.id)} />
            <ListItemText primary={account.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  