//This file contains all the API calls related to the animal entity.
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
//This function gets all the animals from the database.
export const getAnimals = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/animals");
  return data;
};
//This function deletes an animal from the database.
export const deleteAnimal = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/animals/delete/${id}`
  );
  return data;
};
//This function gets an animal by its name.
export const getAnimalByName = async (name) => {
  const { data } = await axios.get(
    `${BASE_URL}/v1/animals/by-name/${name}`
  );
  return data;
};
//This function creates an animal in the database.
export const createAnimal = async (animal) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/animals/create`,
    animal
  );
  return data;
};
//This function updates an animal in the database.
export const updateAnimalFunc = async (animal) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/animals/update/${animal.id}`,
    animal
  );
  return data;
};