import { useState, useEffect } from "react";
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
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointmentFunc,
  getAppointmentsByAnimalIdAndPeriod,
  getAppointmentsByDoctorIdAndPeriod,
} from "../../APIs/Appointment";
import { getDoctors } from "../../APIs/Doctor";
import { getAnimals } from "../../APIs/Animal";
import { getAvailableDates } from "../../APIs/AvailableDate";
import "./Appointment.css";

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [originalAppointment, setOriginalAppointment] = useState([]);
  const [reload, setReload] = useState(true);
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [availableDate, setAvailableDate] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: { id: "doctor" },
    animal: { id: "animal" },
  });

  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: { id: "doctor" },
    animal: { id: "animal" },
  });

  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointment(data.data.items);
      setOriginalAppointment(data.data.items);
    });
    getDoctors().then((data) => {
      setDoctor(data.data.items);
    });
    getAnimals().then((data) => {
      setAnimal(data.data.items);
    });
    getAvailableDates().then((data) => {
      setAvailableDate(data.data.items);
    });
    setReload(false);
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id).then(() => {
        setReload(true);
      });
      handleSuccessfulResponse("Appointment deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateAppointmentFunc(updateAppointment).then(() => {
        setReload(true);
      });
      setUpdateAppointment({
        appointmentDate: "",
        doctor: { id: "doctor" },
        animal: { id: "animal" },
      });
      handleSuccessfulResponse("Appointment updated successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleCreate = async () => {
    try {
      await createAppointment(newAppointment).then(() => {
        setReload(true);
      });
      setNewAppointment({
        appointmentDate: "",
        doctor: { id: "doctor" },
        animal: { id: "animal" },
      });
      handleSuccessfulResponse("Appointment created successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const [selectedDoctor, setSelectedDoctor] = useState("doctor");
  const [selectedDoctorName, setSelectedDoctorName] = useState("doctor");

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    setSelectedDoctorName(e.target.options[e.target.selectedIndex].text);
  };

  const handleUpdateIconDoctorChange = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const [selectedAnimal, setSelectedAnimal] = useState("animal");

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
  };

  const [searchDoctor, setSearchDoctor] = useState("doctor");
  const [searchAnimal, setSearchAnimal] = useState("animal");

  const [searchStartDateAnimal, setSearchStartDateAnimal] = useState("");
  const [searchEndDateAnimal, setSearchEndDateAnimal] = useState("");

  const [searchStartDateDoctor, setSearchStartDateDoctor] = useState("");
  const [searchEndDateDoctor, setSearchEndDateDoctor] = useState("");

  const handleSearchByAnimalAndPeriod = () => {
    getAppointmentsByAnimalIdAndPeriod(
      searchAnimal,
      searchStartDateAnimal,
      searchEndDateAnimal
    ).then((data) => {
      setAppointment(data.data);
    });
  };

  const handleSearchByDoctorAndPeriod = () => {
    getAppointmentsByDoctorIdAndPeriod(
      searchDoctor,
      searchStartDateDoctor,
      searchEndDateDoctor
    ).then((data) => {
      setAppointment(data.data);
    });
  };

  const handleClearSearch = () => {
    setAppointment(originalAppointment);
    setSearchAnimal("animal");
    setSearchDoctor("doctor");
    setSearchStartDateAnimal("");
    setSearchEndDateAnimal("");
    setSearchStartDateDoctor("");
    setSearchEndDateDoctor("");
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
      field: "appointmentDate",
      headerName: "Appoinment Date",
      flex: 1.25,
      headerClassName: "column-header",
    },
    {
      field: "doctorName",
      headerName: "Doctor",
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
      field: "operations",
      headerName: "Operations",
      sortable: false,
      flex: 0.8,
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setUpdateAppointment(params.row);
              setSelectedDoctor(params.row.doctor.id);
            }}
          >
            <UpdateIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];

  const rows = appointment.map((item) => ({
    id: item.id,
    appointmentDate: item.appointmentDate,
    doctorName: item.doctor.name,
    animalName: item.animal.name,
    doctor: item.doctor,
    animal: item.animal,
  }));

  return (
    <>
      <div className="center">
        <h1 className="page-header">Appointment Management</h1>

        <div className="table">
          <h2 className="table-header">Appointment List</h2>
          <div className="srch-header">
            <h2>Search by Animal</h2>
            <h2>Search by Doctor</h2>
          </div>
        </div>

        <div className="app-up-all">
          <div style={{ height: 300, width: "50%", marginRight: "5%" }}>
            <style>{`
            .column-header .MuiDataGrid-columnSeparator {
            display: none;
            }
        `}</style>
            <DataGrid rows={rows} columns={columns} />
          </div>

          <div className="srch-all">
            <div className="srch">
              <div className="slct">
                <select
                  value={searchAnimal}
                  onChange={(e) => setSearchAnimal(e.target.value)}
                >
                  <option value="animal">Select Animal</option>
                  {animal.map((animal) => {
                    return (
                      <option key={animal.id} value={animal.id}>
                        {animal.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="srch-dates">
                <div className="start">
                  <h4>Start</h4>
                  <input
                    type="date"
                    value={searchStartDateAnimal}
                    onChange={(e) => setSearchStartDateAnimal(e.target.value)}
                  />
                </div>

                <div className="end">
                  <h4>End</h4>
                  <input
                    type="date"
                    value={searchEndDateAnimal}
                    onChange={(e) => setSearchEndDateAnimal(e.target.value)}
                  />
                </div>
              </div>

              <div className="srch-btn">
                <div className="clear">
                  <Button
                    variant="outlined"
                    startIcon={<CleaningServicesRoundedIcon />}
                    onClick={handleClearSearch}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <Button
                    className="scnd-btn"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={handleSearchByAnimalAndPeriod}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="srch">
              <div className="slct">
                <select
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                >
                  <option value="doctor">Select Doctor</option>
                  {doctor.map((doctor) => {
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="srch-dates">
                <div className="start">
                  <h4>Start</h4>
                  <input
                    type="date"
                    value={searchStartDateDoctor}
                    onChange={(e) => setSearchStartDateDoctor(e.target.value)}
                  />
                </div>

                <div className="end">
                  <h4>End</h4>
                  <input
                    type="date"
                    value={searchEndDateDoctor}
                    onChange={(e) => setSearchEndDateDoctor(e.target.value)}
                  />
                </div>
              </div>

              <div className="srch-btn">
                <div className="clear">
                  <Button
                    variant="outlined"
                    startIcon={<CleaningServicesRoundedIcon />}
                    onClick={handleClearSearch}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <Button
                    className="scnd-btn"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    onClick={handleSearchByDoctorAndPeriod}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-add-upd">
          <div className="app-add-upd-header">
            <h2>Available Dates</h2>
          </div>

          <div className="app-op">
            <div className="app-op-left">
              <div className="app-date-list">
                {availableDate.map((date) => {
                  return (
                    date.doctor.id == selectedDoctor && (
                      <div className="date" key={date.id}>
                        {date.date}
                      </div>
                    )
                  );
                })}
              </div>

              <div className="slct-doc">
                <select
                  value={
                    updateAppointment.doctor.id || newAppointment.doctor.id
                  }
                  onChange={(e) => {
                    setUpdateAppointment({
                      ...updateAppointment,
                      doctor: { id: e.target.value },
                    });
                    handleDoctorChange(e);
                    setNewAppointment({
                      ...newAppointment,
                      doctor: { id: e.target.value },
                    });
                  }}
                >
                  <option value="doctor">Select Doctor</option>
                  {doctor.map((doctor) => {
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="app-op-right">
              <div className="slct-date">
                <input
                  type="datetime-local"
                  value={
                    updateAppointment.appointmentDate ||
                    newAppointment.appointmentDate
                  }
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const localSelectedDate = new Date(
                      selectedDate.getTime() -
                        selectedDate.getTimezoneOffset() * 60000
                    );
                    const updatedDate = new Date(
                      localSelectedDate.getFullYear(),
                      localSelectedDate.getMonth(),
                      localSelectedDate.getDate(),
                      localSelectedDate.getHours(),
                      0,
                      0
                    );

                    setUpdateAppointment({
                      ...updateAppointment,
                      appointmentDate: updatedDate.toISOString().slice(0, 16),
                    });

                    setNewAppointment({
                      ...newAppointment,
                      appointmentDate: updatedDate.toISOString().slice(0, 16),
                    });
                  }}
                />
              </div>

              <div className="slct-animal">
                <select
                  value={
                    updateAppointment.animal.id || newAppointment.animal.id
                  }
                  onChange={(e) => {
                    handleAnimalChange(e);
                    setNewAppointment({
                      ...newAppointment,
                      animal: { id: e.target.value },
                    });
                    setUpdateAppointment({
                      ...updateAppointment,
                      animal: { id: e.target.value },
                    });
                  }}
                >
                  <option value="animal">Select Animal</option>
                  {animal.map((animal) => {
                    return (
                      <option key={animal.id} value={animal.id}>
                        {animal.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="app-btn">
            <Button
              variant="outlined"
              startIcon={<PublishedWithChangesIcon />}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              className="app-add-btn"
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

export default Appointment;
