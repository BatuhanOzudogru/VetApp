import axios from "axios";
const BASE_URL = "https://vetclinicrestapi.onrender.com" ;

export const getAnimals = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/animals");
  return data;
};

export const deleteAnimal = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/animals/delete/${id}`
  );
  return data;
};

export const getAnimalByName = async (name) => {
  const { data } = await axios.get(
    `${BASE_URL}/v1/animals/by-name/${name}`
  );
  return data;
};

export const createAnimal = async (animal) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/animals/create`,
    animal
  );
  return data;
};

export const updateAnimalFunc = async (animal) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/animals/update/${animal.id}`,
    animal
  );
  return data;
};