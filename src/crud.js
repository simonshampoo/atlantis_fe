import axios from "axios";

// Assuming baseURL is the same for all requests
const baseURL = "http://localhost:8888/";

const fetchAlumni = async (setAlumni) => {
  const response = await axios.get(`${baseURL}read.php`);
  setAlumni(response.data);
};

const addAlumni = async (formData, fetchAlumni) => {
  await axios.post(`${baseURL}create.php`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  fetchAlumni();
};

const updateAlumni = async (formData, fetchAlumni) => {
  await axios.post(`${baseURL}update.php`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  fetchAlumni();
};

const deleteAlumni = async (id, fetchAlumni) => {
  await axios.post(`${baseURL}delete.php`, { id });
  fetchAlumni();
};

export { fetchAlumni, addAlumni, updateAlumni, deleteAlumni };
