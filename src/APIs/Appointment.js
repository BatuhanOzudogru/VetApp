import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
//This function gets all the appointments from the database.
export const getAppointments = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/appointments");
  return data;
};
//This function deletes an appointment from the database.
export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/appointments/delete/${id}`
  );
  return data;
};
//This function creates an appointment in the database.
export const createAppointment = async (appointment) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/appointments/create`,
    appointment
  );
  return data;
};
//This function updates an appointment in the database.
export const updateAppointmentFunc = async (appointment) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/appointments/update/${appointment.id}`,
    appointment
  );
  return data;
};
//This function gets an appointment by its id and period.
export const getAppointmentsByAnimalIdAndPeriod = async (id, startDate, endDate) => {
  const { data } = await axios.get(`${BASE_URL}/v1/appointments/by-animal-and-period/${id}?startDate=${startDate}&endDate=${endDate}`);
  return data;
};
//This function gets an appointment by its id and period.
export const getAppointmentsByDoctorIdAndPeriod = async (id, startDate, endDate) => {
  const { data } = await axios.get(`${BASE_URL}/v1/appointments/by-doctor-and-period/${id}?startDate=${startDate}&endDate=${endDate}`);
  return data;
};