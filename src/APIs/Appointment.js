import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getAppointments = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/appointments");
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/appointments/delete/${id}`
  );
  return data;
};

export const createAppointment = async (appointment) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/appointments/create`,
    appointment
  );
  return data;
};

export const updateAppointmentFunc = async (appointment) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/appointments/update/${appointment.id}`,
    appointment
  );
  return data;
};

export const getAppointmentsByAnimalIdAndPeriod = async (id, startDate, endDate) => {
  const { data } = await axios.get(`${BASE_URL}/v1/appointments/by-animal-and-period/${id}?startDate=${startDate}&endDate=${endDate}`);
  return data;
};

export const getAppointmentsByDoctorIdAndPeriod = async (id, startDate, endDate) => {
  const { data } = await axios.get(`${BASE_URL}/v1/appointments/by-doctor-and-period/${id}?startDate=${startDate}&endDate=${endDate}`);
  return data;
};