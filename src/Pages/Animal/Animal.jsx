import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Button, Alert} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PetsIcon from "@mui/icons-material/Pets";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import {
  getAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimalFunc,
  getAnimalByName,
} from "../../APIs/Animal";
import { getCustomers, getCustomerByName } from "../../APIs/Customer";
import "./Animal.css";

function Animal() {
  // Constants
  const initialAnimalState = {
    name: "",
    species: "",
    breed: "",
    gender: "",
    color: "",
    dateOfBirth: "",
    customer: { id: "customer" },
  };

  // State
  const [animal, setAnimal] = useState([]);
  const [reload, setReload] = useState(true);
  const [customer, setCustomer] = useState([]);
  const [newAnimal, setNewAnimal] = useState(initialAnimalState);
  const [updateAnimal, setUpdateAnimal] = useState(initialAnimalState);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchByCustomerName, setSearchByCustomerName] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  // Effects
  useEffect(() => {
    getAnimals().then((data) => {
      setAnimal(data.data.items);
    });
    getCustomers().then((data) => {
      setCustomer(data.data.items);
    });
    setReload(false);
  }, [reload]);

  useEffect(() => {
    const results = animal.filter((item) =>
      item.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [animal]);

    useEffect(() => {
    const results = animal.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [animal]);

  // Handlers
  const handleDelete = async (id) => {
    try {
      await deleteAnimal(id);
      setAnimal(animal.filter((animal) => animal.id !== id));
      handleSuccessfulResponse("Animal deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateAnimalFunc(updateAnimal).then(() => {
        setReload(true);
      });
      resetAnimalState();
      handleSuccessfulResponse("Animal updated successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleCreate = async () => {
    try {
      await createAnimal(newAnimal).then(() => {
        setReload(true);
        resetAnimalState();
      });
      handleSuccessfulResponse("Animal created successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const resetAnimalState = () => {
    setNewAnimal(initialAnimalState);
    setUpdateAnimal(initialAnimalState);
  };

  const handleNewAnimal = (event) => {
    const { name, value } = event.target;
    setNewAnimal({ ...newAnimal, [name]: value });
    setUpdateAnimal({ ...updateAnimal, [name]: value });
  };

  const handleCustomerSelect = (event) => {
    const selectedCustomerId = event.target.value;
    setUpdateAnimal({ ...updateAnimal, customer: { id: selectedCustomerId } });
    setNewAnimal({ ...newAnimal, customer: { id: selectedCustomerId } });
  };

  const handleSearchByCustomer = () => {
    const results = animal.filter((item) =>
      item.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearchByAnimal = () => {
    const results = animal.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

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

  // Columns for DataGrid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "species",
      headerName: "Species",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "dateOfBirth",
      headerName: "DateofBirth",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "customer2",
      headerName: "Owner",
      flex: 1,
      headerClassName: "column-header",
    },
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
          <IconButton onClick={() => setUpdateAnimal(params.row)}>
            <UpdateIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];

  // Rows for DataGrid
  const rows = searchResults.map((animalItem) => ({
    id: animalItem.id,
    name: animalItem.name,
    species: animalItem.species,
    breed: animalItem.breed,
    gender: animalItem.gender,
    color: animalItem.color,
    dateOfBirth: animalItem.dateOfBirth,
    customer: { id: animalItem.customer.id, name: animalItem.customer.name },
    customer2: animalItem.customer.name,
  }));

  return (
    <>
      <div className="center">
        <h1 className="page-header">Animal Management</h1>

        <div className="table">
          <h2 className="table-header">Animal List</h2>

          <div className="animal-search">
        {/* Input field for searching by animal name */}
        <input
          className="animal-search-input"
          type="text"
          placeholder="Please enter a name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Button to trigger search by customer */}
        <Button
          className="srch-customer-btn"
          variant="outlined"
          startIcon={<PersonIcon />}
          onClick={handleSearchByCustomer} // Perform search when clicked
        >
          Search by Customer
        </Button>
        {/* Button to trigger search by animal */}
        <Button
          variant="outlined"
          endIcon={<PetsIcon />}
          onClick={handleSearchByAnimal} // Perform search when clicked
        >
          Search by Animal
        </Button>
      </div>
        </div>

        <div style={{ height: 250, width: "100%" }}>
          {/* Styling for hiding column separators */}
          <style>{`
            .column-header .MuiDataGrid-columnSeparator {
              display: none;
            }
          `}</style>
          {/* Displaying data grid */}
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className="animal-operations">
          <h2>Animal Operations</h2>

          {/* Input fields for animal information */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={updateAnimal.name || newAnimal.name}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, name: e.target.value });
              handleNewAnimal(e);
            }}
          />
          <input
            type="text"
            placeholder="Species"
            name="species"
            value={updateAnimal.species || newAnimal.species}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, species: e.target.value });
              handleNewAnimal(e);
            }}
          />
          <input
            type="text"
            placeholder="Breed"
            name="breed"
            value={updateAnimal.breed || newAnimal.breed}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, breed: e.target.value });
              handleNewAnimal(e);
            }}
          />
          {/* Dropdown for selecting gender */}
          <select
            name="gender"
            value={updateAnimal.gender || newAnimal.gender}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, gender: e.target.value });
              handleNewAnimal(e);
            }}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="text"
            placeholder="Color"
            name="color"
            value={updateAnimal.color || newAnimal.color}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, color: e.target.value });
              handleNewAnimal(e);
            }}
          />

          <input
            type="date"
            name="dateOfBirth"
            value={updateAnimal.dateOfBirth || newAnimal.dateOfBirth}
            onChange={(e) => {
              setUpdateAnimal({ ...updateAnimal, dateOfBirth: e.target.value });
              handleNewAnimal(e);
            }}
          />

          {/* Dropdown for selecting customer */}
          <select
            name="update"
            value={updateAnimal.customer.id || newAnimal.customer.id}
            onChange={handleCustomerSelect}
          >
            <option value="customer" disabled>
              Select Customer
            </option>
            {/* Mapping customer options */}
            {customer.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Buttons for update and create */}
          <div className="animal-buttons">
            <Button
              variant="outlined"
              startIcon={<PublishedWithChangesIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              className="animal-add-btn"
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

export default Animal;