import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Button, Alert } from "@mui/material";
import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
  getCustomerByName,
} from "../../APIs/Customer";
import "./Customer.css";

function Customer() {
  // State variables to manage customers, search term, and new customer data
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  // Fetch customers data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data.data.items);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Handle search operation -New-
  const handleSearch = async () => {
    try {
      if (searchTerm == "") {
        const data = await getCustomers();
        setCustomers(data.data.items);
      } else {
        const data = await getCustomerByName(searchTerm);
        setCustomers(data.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };
  


  // Delete customer by ID
  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
      handleSuccessfulResponse("Customer deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Update customer data
  const handleUpdate = async () => {
    try {
      await updateCustomerFunc(newCustomer);
      setNewCustomer({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      fetchData();
      handleSuccessfulResponse("Customer updated successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Create new customer
  const handleCreate = async () => {
    try {
      await createCustomer(newCustomer);
      setNewCustomer({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      fetchData();
      handleSuccessfulResponse("Customer created successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Handle changes in new customer form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Set new customer data for update
  const handleUpdateBtn = (customer) => {
    setNewCustomer(customer);
  };

  // Function to handle axios errors
  const handleAxiosError = (error) => {
    let errorMessage = "An error occurred.";
    if (error.response.data.data) {
      errorMessage = error.response.data.data[0];
    } else if (error.response.data.message) {
      errorMessage = error.response.data.message;
    } 
    setNotification({ message: errorMessage, severity: "error" });
    setTimeout(() => {
      setNotification({ message: "", severity: "" });
    }, 3000);
  };

  // Function to handle successful response
  const handleSuccessfulResponse = (message, severity) => {
    setNotification({ message: message, severity: severity });
    setTimeout(() => {
      setNotification({ message: "", severity: "" });
    }, 3000);
  };

  // Columns configuration for DataGrid component
  const columns = [
    { field: "name", headerName: "Customer Name", flex: 1 },
    { field: "phone", headerName: "Customer Phone", flex: 1 },
    { field: "mail", headerName: "Customer Mail", flex: 1 },
    { field: "address", headerName: "Customer Address", flex: 2 },
    { field: "city", headerName: "Customer City", flex: 1 },
    {
      field: "operations",
      headerName: "Operations",
      sortable: false,
      flex: 1,
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdateBtn(params.row)}>
            <UpdateIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  // Mapped rows based on search term
  const rows = customers.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    mail: item.mail,
    address: item.address,
    city: item.city
  }));
  

  return (
    <>
      <div className="center">
        {/* Page header */}
        <h1 className="page-header">Customer Management</h1>

        <div className="table">
          {/* Table header and search input */}
          <h2 className="table-header">Customer List</h2>
          <div className="customer-search">
          <input
            className="table-search"
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
             <Button
                    className="scnd-btn"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
          </div>
          
        </div>

        <div style={{ height: 300, width: "100%" }}>
          {/* DataGrid component to display customers */}
          <style>{`
            .column-header .MuiDataGrid-columnSeparator {
              display: none;
            }
          `}</style>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className="customer-operations">
          {/* Customer operations section */}
          <h2>Customer Operations</h2>
          {/* Form inputs for new customer */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newCustomer.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone (5xx) - xxx - xx - xx"
            name="phone"
            value={newCustomer.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Mail (yourmail@abc.com)"
            name="mail"
            value={newCustomer.mail}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={newCustomer.address}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newCustomer.city}
            onChange={handleChange}
          />
          {/* Buttons for update and create operations */}
          <div className="customer-buttons">
            <Button
              variant="outlined"
              startIcon={<PublishedWithChangesIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              className="customer-add-btn"
              variant="contained"
              endIcon={<PersonAddIcon />}
              onClick={handleCreate}
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* Alert to display errors and success messages */}
      {notification.message && (
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ message: "", severity: "" })}
          sx={{
            position: "fixed",
            bottom: "24px",
            right: "-177px",
            width: "400px",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          {notification.message}
        </Alert>
      )}
    </>
  );
}

export default Customer;


