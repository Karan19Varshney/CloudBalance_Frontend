import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getApi } from "../../../Service/CommonService";
import { URLS } from "../../../Service/URLS";
import { API_ENDPOINTS, tabMap, allColumns } from "./AwsServicesConfig";

const AwsService = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setAccountLoading(true);
        setSelectedAccount(null);
    
        const res = await getApi(URLS.GetAccounts);
        let fetchedAccounts = [];
    
        if (Array.isArray(res)) {
          fetchedAccounts = res;
        } else if (Array.isArray(res.accounts)) {
          fetchedAccounts = res.accounts;
        }
    
        setAccounts(fetchedAccounts);
    
        if (fetchedAccounts.length > 0) {
          setSelectedAccount(fetchedAccounts[0]);
        }
      } catch (err) {
        setAccounts([]);
      } finally {
        setAccountLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    if (selectedAccount?.accountId) {
      fetchData(tabMap[tabIndex].key, selectedAccount.accountId);
    }
  }, [tabIndex, selectedAccount]);

  const fetchData = async (type, accountId) => {
    try {
      setLoading(true);
      const res = await getApi(`${API_ENDPOINTS[type]}?accountId=${accountId}`);
      setData(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching resource data:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, position: "relative" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Tabs value={tabIndex} onChange={(_, val) => setTabIndex(val)} disabled={loading}>
          {Object.values(tabMap).map((tab, idx) => (
            <Tab key={idx} label={tab.label} />
          ))}
        </Tabs>

        <FormControl sx={{ minWidth: 200 }} disabled={loading || accountLoading}>
          <InputLabel id="account-select-label">Select Account</InputLabel>
          {accountLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              labelId="account-select-label"
              value={selectedAccount?.arn || ""}
              label="Select Account"
              onChange={(e) => {
                const acc = accounts.find((a) => a.arn === e.target.value);
                setSelectedAccount(acc || null);
              }}
            >
              {Array.isArray(accounts) &&
                accounts.map((acc) => (
                  <MenuItem key={acc.arn} value={acc.arn}>
                    {acc.name || acc.accountId || acc.arn}
                  </MenuItem>
                ))}
            </Select>
          )}
        </FormControl>
      </Box>

      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={data.map((item, index) => ({ id: index, ...item }))}
          columns={allColumns[tabMap[tabIndex].key] || []}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default AwsService;
