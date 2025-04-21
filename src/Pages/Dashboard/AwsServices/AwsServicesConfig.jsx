export const API_ENDPOINTS = {
    ec2: "/aws/ec2",
    rds: "/aws/rds",
    asg: "/aws/asg",
    accounts: "/accounts",
  };
  
  export const tabMap = {
    0: { label: "EC2", key: "ec2" },
    1: { label: "RDS", key: "rds" },
    2: { label: "ASG", key: "asg" },
  };
  
  export const allColumns = {
    ec2: [
      { field: "resourceId", headerName: "Resource ID", flex: 1 },
      { field: "resourceName", headerName: "Resource Name", flex: 1 },
      { field: "region", headerName: "Region", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
    ],
    rds: [
      { field: "resourceId", headerName: "Resource ID", flex: 1 },
      { field: "resourceName", headerName: "Resource Name", flex: 1 },
      { field: "engine", headerName: "Engine", flex: 1 },
      { field: "region", headerName: "Region", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
    ],
    asg: [
      { field: "resourceId", headerName: "Resource ID", flex: 1 },
      { field: "resourceName", headerName: "Resource Name", flex: 1 },
      { field: "region", headerName: "Region", flex: 1 },
      { field: "desiredCapacity", headerName: "Desired Capacity", flex: 1 },
      { field: "minSize", headerName: "Min Size", flex: 1 },
      { field: "maxSize", headerName: "Max Size", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
    ],
  };