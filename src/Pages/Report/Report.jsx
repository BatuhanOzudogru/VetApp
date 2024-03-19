import React, { useState, useEffect } from "react";
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
import {
  getReports,
  createReport,
  deleteReport,
  updateReportFunc,
} from "../../APIs/Report";
import { getAppointments } from "../../APIs/Appointment";
import { getAnimals } from "../../APIs/Animal";
import "./Report.css";

function Report() {
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(true);
  const [animal, setAnimal] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointment: { id: "" },
  });
  const [updateReport, setUpdateReport] = useState({
    id: "",
    title: "",
    diagnosis: "",
    price: "",
    appointment: { id: "" },
  });

  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  useEffect(() => {
    getReports().then((data) => {
      setReports(data.data.items);
    });
    getAppointments().then((data) => {
      setAppointment(data.data.items);
    });
    getAnimals().then((data) => {
      setAnimal(data.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleCreate = async () => {
    try {
      await createReport(newReport).then(() => {
        setReload(true);
      });
      setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: { id: "" },
      });
      setUpdateReport({
        id: "",
        title: "",
        diagnosis: "",
        price: "",
        appointment: { id: "" },
      });
      handleSuccessfulResponse("Report created successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReport(id).then(() => {
        setReload(true);
      });
      handleSuccessfulResponse("Report deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateReportFunc(updateReport).then(() => {
        setReload(true);
      });
      setUpdateReport({
        id: "",
        title: "",
        diagnosis: "",
        price: "",
        appointment: { id: "" },
      });
      setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointment: { id: "" },
      });
      handleSuccessfulResponse("Report updated successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
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


  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
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
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "appointmentDate",
      headerName: "Appointment",
      flex: 2,
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setUpdateReport({ ...params.row })}>
            <UpdateIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];
  const rows = reports.map((item) => ({
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
        <h1 className="page-header">Report Management</h1>

        <div className="table">
          <h2 className="table-header">Report List</h2>
        </div>

        <div style={{ height: 300, width: "100%" }}>
          <style>{`
.column-header .MuiDataGrid-columnSeparator {
display: none;
}
`}</style>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className="report-operations">
          <h2>Report Operations</h2>

          <input
            type="text"
            placeholder="Title"
            value={updateReport.title || newReport.title}
            onChange={(e) => {
              setUpdateReport({ ...updateReport, title: e.target.value });
              setNewReport({ ...newReport, title: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Diagnosis"
            value={updateReport.diagnosis || newReport.diagnosis}
            onChange={(e) => {
              setUpdateReport({ ...updateReport, diagnosis: e.target.value });
              setNewReport({ ...newReport, diagnosis: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Price"
            value={updateReport.price || newReport.price}
            onChange={(e) => {
              setUpdateReport({ ...updateReport, price: e.target.value });
              setNewReport({ ...newReport, price: e.target.value });
            }}
          />
          <select
            value={updateReport.appointment.id || newReport.appointment.id}
            onChange={(e) => {
              setUpdateReport({
                ...updateReport,
                appointment: { id: e.target.value },
              });
              setNewReport({
                ...newReport,
                appointment: { id: e.target.value },
              });
            }}
          >
            <option value="">Select Appointment</option>
            {appointment.map((appointment, index) => {
              return (
                <option key={index} value={appointment.id}>
                  {appointment.appointmentDate}
                </option>
              );
            })}
          </select>

          <div className="report-buttons">
            <Button
              variant="outlined"
              startIcon={<PublishedWithChangesIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              className="report-add-btn"
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

export default Report;