import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
 

export const getCustomers = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/customers");
  return data;
};

export const getCustomerByName = async (name) => {
  const { data } = await axios.get(
    `${BASE_URL}/v1/customers/by-name/${name}`
  );
  return data;
}

export const deleteCustomer = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/customers/delete/${id}`
  );
  return data;
};

export const createCustomer = async (customer) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/customers/create`,
    customer
  );
  return data;
};

export const updateCustomerFunc = async (customer) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/customers/update/${customer.id}`,
    customer
  );
  return data;
};