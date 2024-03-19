import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
//This function gets all the doctors from the database.
export const getDoctors = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/doctors");
  return data;
};
//This function deletes a doctor from the database.
export const deleteDoctor = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/doctors/delete/${id}`
  );
  return data;
};
//This function creates a doctor in the database.
export const createDoctor = async (doctor) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/doctors/create`,
    doctor
  );
  return data;
};
//This function updates a doctor in the database.
export const updateDoctorFunc = async (doctor) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/doctors/update/${doctor.id}`,
    doctor
  );
  return data;
};