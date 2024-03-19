import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getAvailableDates = async () => {
  const { data } = await axios.get(BASE_URL+ "/v1/dates");
  return data;
};

export const deleteAvailableDate = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/dates/delete/${id}`
  );
  return data;
};

export const createAvailableDate = async (date) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/dates/create`,
    date
  );
  return data;
};

export const updateAvailableDateFunc = async (date) => {
    const newDate ={
        id: date.id,
        date: date.newDate,
        doctor: {
            id: date.doctor.id
        }
    
    }
    console.log(newDate);
  const { data } = await axios.put(
    `${BASE_URL}/v1/dates/update/${newDate.id}`,
    newDate
  );
  
  return data;
};