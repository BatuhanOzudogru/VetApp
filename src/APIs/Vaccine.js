import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getVaccines = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/vaccines");
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/vaccines/delete/${id}`
  );
  return data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/vaccines/create`,
    vaccine
  );
  return data;
};

export const updateVaccineFunc = async (vaccine) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/vaccines/update/${vaccine.id}`,
    vaccine
  );
  return data;
};

export const getVaccinesByPeriod = async (startDate, endDate) => {
  const { data } = await axios.get(`${BASE_URL}/v1/vaccines/by-period?startDate=${startDate}&endDate=${endDate}`);
  return data;
};

export const getVaccinesByAnimalId = async (id) => {
  const { data } = await axios.get(`${BASE_URL}/v1/vaccines/by-animal-id/${id}`);
  return data;
}
