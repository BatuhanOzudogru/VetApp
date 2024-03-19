import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getDoctors = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/doctors");
  return data;
};

export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/doctors/delete/${id}`
  );
  return data;
};

export const createDoctor = async (doctor) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/doctors/create`,
    doctor
  );
  return data;
};

export const updateDoctorFunc = async (doctor) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/doctors/update/${doctor.id}`,
    doctor
  );
  return data;
};