import axios from "axios";

const API_URL = "http://34.204.247.99/timeline";

const fetchEntries = () => {
  return axios.get(`${API_URL}read.php`);
};

const createEntry = (title, description, due_date) => {
  return axios.post(`${API_URL}create.php`, { title, description, due_date });
};

const updateEntry = (id, title, description, due_date) => {
  return axios.post(`${API_URL}update.php`, {
    id,
    title,
    description,
    due_date,
  });
};

const deleteEntry = (id) => {
  return axios.post(`${API_URL}delete.php`, { id });
};

export default {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry,
};
