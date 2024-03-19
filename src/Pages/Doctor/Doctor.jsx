import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { IconButton } from "@mui/material";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import {
  getDoctors,
  deleteDoctor,
  createDoctor,
  updateDoctorFunc,
} from "../../APIs/Doctor";
import {
  getAvailableDates,
  createAvailableDate,
  updateAvailableDateFunc,
  deleteAvailableDate,
} from "../../APIs/AvailableDate";
import "./Doctor.css";

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [dates, setDates] = useState([{ date: "", doctor: { id: "doctor" } }]);
  const [reload, setReload] = useState(true);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [newDates, setNewDates] = useState({
    date: "",
    doctor: { id: selectedDoctorId },
  });

  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const [updateDates, setUpdateDates] = useState({
    id: "",
    date: "",
    newDate: "",
    doctor: { id: "doctor" },
  });

  const [filteredDates, setFilteredDates] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    severity: "",
  });

  var newArray = [];

  const selectUpdateDoctor = (event) => {
    newArray = dates.filter((date) => date.doctor.id == event.id);

    setFilteredDates((prev) => [...newArray]);
    setUpdateDates({
      ...updateDates,
      doctor: { id: event.id },
    });
  };

  const handleUpdateBtn = () => {
    updateAvailableDateFunc(updateDates).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctor(data.data.items);
    });
    setReload(false);
    getAvailableDates().then((data) => {
      setDates(data.data.items);
    });
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id).then(() => {
        setReload(true);
      });
      handleSuccessfulResponse("Doctor deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleDateDelete = async (id) => {
    try {
      await deleteAvailableDate(id).then(() => {
        getAvailableDates().then((data) => {
          setFilteredDates(data.data.items);
        });
      });
      handleSuccessfulResponse("Date deleted successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await  updateDoctorFunc(updateDoctor).then(() => {
        setReload(true);
      });
      setUpdateDoctor({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      setUpdateDates({
        date: "",
        doctor: { id: "doctor" },
      });
      setNewDoctor({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      handleSuccessfulResponse("Doctor updated successfully.", "success");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      await createDoctor(newDoctor).then(() => {
        setReload(true);
      });
      setNewDoctor({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      setUpdateDoctor({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
      handleSuccessfulResponse("Doctor created successfully.", "success");
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
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "mail",
      headerName: "Mail",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerClassName: "column-header",
    },
    {
      field: "city",
      headerName: "City",
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
              setUpdateDoctor(params.row);
              setUpdateDates(params.row.dates);
              selectUpdateDoctor(params.row);
              selectUpdateDoctorId(params.row);
            }}
          >
            <UpdateIcon />
          </IconButton>
        </div>
      ),
      headerClassName: "column-header",
    },
  ];

  const rows = doctor.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    mail: item.mail,
    address: item.address,
    city: item.city,
    dates: dates
      .filter((date) => date.doctor.id === item.id)
      .map((date) => date.date),
  }));

  const selectUpdateDoctorId = (row) => {
    const doctorId = row.id;
    setSelectedDoctorId(doctorId); // Assuming setSelectedDoctorId is a function to update selectedDoctorId state
  };

  const getAvailableDatesForDoctor = (doctorId) => {
    // Doktor ID'siyle birlikte API'ye istek gönder ve sadece seçili doktorun available datelerini al
    return getAvailableDates().then((data) => {
      const filteredDates = data.data.items.filter(
        (date) => date.doctor.id === doctorId
      );
      return filteredDates;
    });
  };

  return (
    <>
      <div className="center">
        <h1 className="page-header">Doctor Management</h1>

        <div className="table">
          <h2 className="table-header">Doctor List</h2>
        </div>

        <div style={{ height: 300, width: "100%" }}>
          <style>{`
.column-header .MuiDataGrid-columnSeparator {
display: none;
}
`}</style>
          <DataGrid rows={rows} columns={columns} />
        </div>

        <h2 className="doctor-op-title">Doctor Operations</h2>

        <div className="doctor-operations">
          <div className="doctor-op-left">
            <div className="doctor-upd-add">
              <h2>Doctor Update&Add</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={updateDoctor.name || newDoctor.name}
                onChange={(e) => {
                  setUpdateDoctor({ ...updateDoctor, name: e.target.value });
                  handleNewDoctor(e);
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={updateDoctor.phone || newDoctor.phone}
                onChange={(e) => {
                  setUpdateDoctor({ ...updateDoctor, phone: e.target.value });
                  handleNewDoctor(e);
                }}
              />
              <input
                type="text"
                placeholder="Mail"
                name="mail"
                value={updateDoctor.mail || newDoctor.mail}
                onChange={(e) => {
                  setUpdateDoctor({ ...updateDoctor, mail: e.target.value });
                  handleNewDoctor(e);
                }}
              />

              <input
                type="text"
                placeholder="Address"
                name="address"
                value={updateDoctor.address || newDoctor.address}
                onChange={(e) => {
                  setUpdateDoctor({ ...updateDoctor, address: e.target.value });
                  handleNewDoctor(e);
                }}
              />

              <input
                type="text"
                placeholder="City"
                name="city"
                value={updateDoctor.city || newDoctor.city}
                onChange={(e) => {
                  setUpdateDoctor({ ...updateDoctor, city: e.target.value });
                  handleNewDoctor(e);
                }}
              />
            </div>

            <div className="doctor-buttons">
              <Button
                variant="outlined"
                startIcon={<PublishedWithChangesIcon />}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                className="doctor-add-btn"
                variant="contained"
                endIcon={<PersonAddIcon />}
                onClick={handleCreate}
              >
                Add
              </Button>
            </div>
          </div>

          <div className="doctor-op-right">
            <h2>Available Dates</h2>

            <div className="doctor-date">
              <div className="date-add">
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={newDates.date}
                  onChange={(event) => {
                    setNewDates({
                      ...newDates,
                      date: event.target.value,
                      doctor: { id: selectedDoctorId },
                    });
                  }}
                />

                <Button
                  className="date-add-btn"
                  variant="contained"
                  endIcon={<DateRangeIcon />}
                  onClick={() => {
                    createAvailableDate(newDates).then(() => {
                      setReload(true);
                      
                      // Sadece seçili doktorun available datelerini güncelle
                      getAvailableDatesForDoctor(selectedDoctorId).then(
                        (filteredDates) => {
                          setFilteredDates(filteredDates);
                          console.log(filteredDates);
                        }
                      );
                    });
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="doctor-date-list">
                <table>
                  <tbody>
                    {filteredDates.map((date, index) => (
                      <tr key={index}>
                        <td>{date.date}</td>
                        {filteredDates.length > 0 && (
                          <td>
                            <DeleteIcon
                              onClick={() => {
                                handleDateDelete(date.id);
                              }}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

export default Doctor;
