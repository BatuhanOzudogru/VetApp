import React, { useState, useEffect } from "react";
import {
  getVaccines,
  createVaccine,
  updateVaccineFunc,
  deleteVaccine,
  getVaccinesByPeriod,
  getVaccinesByAnimalId,
} from "../../APIs/Vaccine";
import { getAnimals } from "../../APIs/Animal";
import { getReports } from "../../APIs/Report";
import CheckIcon from "@mui/icons-material/Check";
import { DataGrid } from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { getAppointments } from "../../APIs/Appointment";
import "./Vaccine.css";

function Vaccine() {
  // State variables
  const [vaccines, setVaccines] = useState([]);
  const [reload, setReload] = useState(true);
  const [animal, setAnimal] = useState([]);
  const [reports, setReports] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: { id: "" },
    report: { id: "" },
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animal: { id: "" },
    report: { id: "" },
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [animalId, setAnimalId] = useState("");

  // State variables for selected animal and notification
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  // useEffect to fetch data when component mounts or reload state changes
  useEffect(() => {
    // Fetch vaccines
    getVaccines().then((data) => {
      setVaccines(data.data.items);
    });
    // Fetch appointments
    getAppointments().then((data) => {
      setAppointment(data.data.items);
    });
    // Fetch animals
    getAnimals().then((data) => {
      setAnimal(data.data.items);
    });
    // Fetch reports
    getReports().then((data) => {
      setReports(data.data.items);
    });
    // Reset reload state after data fetching
    setReload(false);
  }, [reload]);

  // Function to reset vaccines
  const resetVaccines = () => {
    getVaccines().then((data) => {
      setVaccines(data.data.items);
    });
  };

  // Function to handle creation of a new vaccine
  const handleCreate = async () => {
    try {
      // Create new vaccine
      await createVaccine(newVaccine).then(() => {
        setReload(true);
      });
      // Reset newVaccine and updateVaccine states
      setNewVaccine({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
        report: { id: "" },
      });
      setUpdateVaccine({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
        report: { id: "" },
      });
      // Clear filteredReports
      setFilteredReports([]);
      // Display success message
      handleSuccessfulResponse("Vaccine created successfully.", "success");
    } catch (error) {
      // Handle error
      handleAxiosError(error);
    }
  };

  // Function to handle deletion of a vaccine
  const handleDelete = async (id) => {
    try {
      // Delete vaccine
      await deleteVaccine(id).then(() => {
        setReload(true);
      });
      // Display success message
      handleSuccessfulResponse("Vaccine deleted successfully.", "success");
    } catch (error) {
      // Handle error
      handleAxiosError(error);
    }
  };

  // Function to handle updating a vaccine
  const handleUpdate = async () => {
    try {
      // Update vaccine
      await updateVaccineFunc(updateVaccine).then(() => {
        setReload(true);
      });
      // Reset newVaccine and updateVaccine states
      setUpdateVaccine({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
        report: { id: "" },
      });
      setNewVaccine({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animal: { id: "" },
        report: { id: "" },
      });
      // Clear filteredReports
      setFilteredReports([]);
      // Display success message
      handleSuccessfulResponse("Vaccine updated successfully.", "success");
    } catch (error) {
      // Handle error
      handleAxiosError(error);
    }
  };


  // State variables and functions for handling filtered reports based on selected animal
const [filteredReports, setFilteredReports] = useState([]);

const handleAnimalChange = (e) => {
  // Filter reports based on selected animal
  const newArray = reports.filter(
    (report) => report.appointment.animal.id == e.target.value
  );
  // Update filteredReports state
  setFilteredReports((prev) => [...newArray]);
};

const handleUpdateIconAnimalChange = (id) => {
  // Filter reports based on animal id
  const newArray = reports.filter(
    (report) => report.appointment.animal.id == id
  );
  // Update filteredReports state
  setFilteredReports((prev) => [...newArray]);
};

// Function to handle setting report for new vaccine
const handleReportBtn = (e) => {
  setNewVaccine({ ...newVaccine, report: { id: e } });
};

// Functions to handle searching vaccines by period and animal
const handlePeriodSearch = () => {
  if (startDate !== "" && endDate !== "") {
    // Search vaccines by period and update state
    getVaccinesByPeriod(startDate, endDate).then((data) => {
      setVaccines(data.data);
    });
  }
};

const handleAnimalSearch = () => {
  if (animalId !== "") {
    // Search vaccines by animal id and update state
    getVaccinesByAnimalId(animalId).then((data) => {
      setVaccines(data.data);
    });
  }
};

// Function to clear search filters
const handleClear = () => {
  setStartDate("");
  setEndDate("");
  setAnimalId("");
  resetVaccines();
};

// Function to handle Axios errors
const handleAxiosError = (error) => {
  let errorMessage = "An error occurred.";
  if (error.response.data.data) {
    errorMessage = error.response.data.data[0];
  } else if (error.response.data.message) {
    errorMessage = error.response.data.message;
  }
  // Set notification message and severity
  setNotification({ message: errorMessage, severity: "error" });
  // Clear notification after 3 seconds
  setTimeout(() => {
    setNotification({ message: "", severity: "" });
  }, 3000);
};

// Function to handle successful response
const handleSuccessfulResponse = (message, severity) => {
  // Set notification message and severity
  setNotification({ message: message, severity: severity });
  // Clear notification after 3 seconds
  setTimeout(() => {
    setNotification({ message: "", severity: "" });
  }, 3000);
};

  // Columns configuration for the data grid
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "code",
      headerName: "Code",
      flex: 0.9,
      headerClassName: "column-header",
    },
    {
      field: "protectionStartDate",
      headerName: "Start",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "protectionFinishDate",
      headerName: "End",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "animalName",
      headerName: "Animal",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "reportName",
      headerName: "Report",
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
          <IconButton
            onClick={() => {
              setUpdateVaccine(params.row);
              handleUpdateIconAnimalChange(params.row.animal.id)
            }}
          >
            <UpdateIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];

  // Transform vaccines data for display in the data grid
  const rows = vaccines.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    protectionStartDate: item.protectionStartDate,
    protectionFinishDate: item.protectionFinishDate,
    animalName: item.animal.name,
    reportName: item.report.title,
    animal: item.animal,
    report: item.report,
  }));

  // Columns configuration for the report data grid
  const reportCol = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.8,
      headerClassName: "column-header",
    },
    {
      field: "diagnosis",
      headerName: "Diagnosis",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.8,
      headerClassName: "column-header",
    },
    {
      field: "appointmentDate",
      headerName: "Appointment",
      flex: 1.3,
      headerClassName: "column-header",
    },
    {
      field: "animalName",
      headerName: "Animal",
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={() => { 
            handleReportBtn(params.row.id)
            setNewVaccine({ ...newVaccine, report:params.row })
            setUpdateVaccine({ ...updateVaccine, report: params.row })
          }}>
            <CheckIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];
  
  // Transform filteredReports data for display in the report data grid
  const reportRow = filteredReports.map((item) => ({
    id: item.id,
    title: item.title,
    diagnosis: item.diagnosis,
    price: item.price,
    appointmentDate: item.appointment.appointmentDate,
    animalName: item.appointment.animal.name,
    appointment: item.appointment,
    animal: item.appointment.animal,
  }));

  return (
    <>
      <div className="center">
        {/* Page header */}
        <h1 className="page-header">Vaccine Management</h1>

        <div className="table">
          {/* Table header */}
          <h2 className="table-header">Vaccine List</h2>
        </div>

        <div className="app-up-all">
          <div style={{ height: 300, width: "825px", marginRight: "25px" }}>
            {/* Hide column separator */}
            <style>{`
    .column-header .MuiDataGrid-columnSeparator {
    display: none;
    }
`}</style>
            {/* Data grid for displaying vaccine list */}
            <DataGrid rows={rows} columns={columns} />
          </div>

          <div className="vaccine-srch-all">
            {/* Search by animal */}
            <div className="vaccine-srch">
              <h2>Search By Animal</h2>
              <div className="vaccine-slct">
                {/* Animal selection dropdown */}
                <select
                  value={animalId}
                  onChange={(e) => setAnimalId(e.target.value)}
                >
                  <option value="">Select Animal</option>
                  {animal.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons for search and clear */}
              <div className="vaccine-srch-btn">
                <div className="clear">
                  <Button
                    variant="outlined"
                    startIcon={<CleaningServicesRoundedIcon />}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <Button
                    className="vaccine-scnd-btn"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={handleAnimalSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Search by period */}
            <div className="vaccine-srch">
              <h2>Search By Period</h2>
              <div className="vaccine-srch-dates">
                <div className="vaccine-start">
                  <h4>Start</h4>
                  {/* Start date input */}
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="vaccine-end">
                  <h4>End</h4>
                  {/* End date input */}
                  <input
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Buttons for search and clear */}
              <div className="vaccine-srch-btn">
                <div className="clear">
                  <Button
                    variant="outlined"
                    startIcon={<CleaningServicesRoundedIcon />}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <Button
                    className="vaccine-scnd-btn"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={handlePeriodSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="vaccine-operations">
          <div className="vaccine-op-left">
            {/* Report list */}
            <div className="vac-rep-tit-cmb">
              <h2>Report List</h2>

              <div className="slct-animal">
                {/* Animal selection dropdown for report list */}
                <select
                  value={updateVaccine.animal.id || newVaccine.animal.id}
                  onChange={(e) => {
                    handleAnimalChange(e)
                    setNewVaccine({
                      ...newVaccine,
                      animal: { id: e.target.value },
                    });
                    setUpdateVaccine({
                      ...updateVaccine,
                      animal: { id: e.target.value },
                    });
                  }}
                >
                  <option value="">Animal</option>
                  {animal.map((animal) => {
                    return (
                      <option value={animal.id} key={animal.id}>
                        {animal.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="vaccine-report-select">
              <div
                className="report-list"
                style={{ height: 300, width: "825px" }}
              >
                {/* Hide column separator */}
                <style>{`
.column-header .MuiDataGrid-columnSeparator {
display: none;
}
`}</style>
                {/* Data grid for displaying report list */}
                <DataGrid rows={reportRow} columns={reportCol} />
              </div>
            </div>
          </div>

          <div className="vaccine-op-right">
            {/* Vaccine update and add section */}
            <h2>Vaccine Update&Add</h2>
            <div className="vaccine-upd-add">
              {/* Inputs for vaccine name, code, and dates */}
              <input
                type="text"
                placeholder="Name"
                value={updateVaccine.name || newVaccine.name}
                onChange={(e) => {
                  setNewVaccine({ ...newVaccine, name: e.target.value })
                  setUpdateVaccine({ ...updateVaccine, name: e.target.value })
                }}
              />
              <input
                type="text"
                placeholder="Code"
                value={updateVaccine.code || newVaccine.code}
                onChange={(e) => {
                  setNewVaccine({ ...newVaccine, code: e.target.value })
                  setUpdateVaccine({ ...updateVaccine, code: e.target.value })
                }}
              />
              <div className="vaccine-dates">
                <div className="vaccine-dates-item">
                  <p>Protection Start Date</p>
                  {/* Protection start date input */}
                  <input
                    type="date"
                    placeholder="Protection Start Date"
                    value={
                      updateVaccine.protectionStartDate ||
                      newVaccine.protectionStartDate
                    }
                    onChange={(e) => {
                      setNewVaccine({
                        ...newVaccine,
                        protectionStartDate: e.target.value,
                      })
                      setUpdateVaccine({
                        ...updateVaccine,
                        protectionStartDate: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className="vaccine-dates-item">
                  <p>Protection End Date</p>
                  {/* Protection end date input */}
                  <input
                    type="date"
                    placeholder="Protection Finish Date"
                    value={
                      updateVaccine.protectionFinishDate ||
                      newVaccine.protectionFinishDate
                    }
                    onChange={(e) => {
                      setNewVaccine({
                        ...newVaccine,
                        protectionFinishDate: e.target.value,
                      })
                      setUpdateVaccine({
                        ...updateVaccine,
                        protectionFinishDate: e.target.value,
                      })
                    }}
                  />
                </div>
                
              </div>
            </div>

            <div className="vaccine-report-item">
              <div>
                {/* Display updated report title */}
                {updateVaccine.report.title || newVaccine.report.title || 'Select an animal from the combobox on the left and select a report by clicking on the "✓" sign.'}
              </div>
            </div>

            {/* Buttons for updating and adding vaccines */}
            <div className="vaccine-buttons">
              <Button
              className="vaccine-upd-btn"
                variant="outlined"
                startIcon={<PublishedWithChangesIcon />}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                className="vaccine-add-btn"
                variant="contained"
                endIcon={<PersonAddIcon />}
                onClick={handleCreate}
              >
                Add
              </Button>
            </div>
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

export default Vaccine;