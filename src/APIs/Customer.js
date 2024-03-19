import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
//This function gets all the customers from the database.
export const getCustomers = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/customers");
  return data;
};
//This function gets a customer by its name.
export const getCustomerByName = async (name) => {
  const { data } = await axios.get(
    `${BASE_URL}/v1/customers/by-name/${name}`
  );
  return data;
}
//This function deletes a customer from the database.
export const deleteCustomer = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/customers/delete/${id}`
  );
  return data;
};
//This function creates a customer in the database.
export const createCustomer = async (customer) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/customers/create`,
    customer
  );
  return data;
};
//This function updates a customer in the database.
export const updateCustomerFunc = async (customer) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/customers/update/${customer.id}`,
    customer
  );
  return data;
};