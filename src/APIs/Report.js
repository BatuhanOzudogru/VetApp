import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const getReports = async () => {
  const { data } = await axios.get(BASE_URL + "/v1/reports");
  return data;
};

export const createReport = async (report) => {
  const { data } = await axios.post(
    `${BASE_URL}/v1/reports/create`,
    report
  );
  return data;
};

export const deleteReport = async (id) => {
  const { data } = await axios.delete(
    `${BASE_URL}/v1/reports/delete/${id}`
  );
  return data;
}

export const updateReportFunc = async (report) => {
  const { data } = await axios.put(
    `${BASE_URL}/v1/reports/update/${report.id}`,
    report
  );
  return data;
};
