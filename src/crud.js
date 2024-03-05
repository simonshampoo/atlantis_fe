import axios from "axios";

const baseURL = "https://34.204.247.99/";

const fetchAlumni = async (setAlumni) => {
  const response = await axios.get(`${baseURL}read.php`);
  console.log("hello")
  console.log(response.data);
  setAlumni(response.data);
};

const addAlumni = async (formData, fetchAlumni) => {
  const response = await axios.post(`${baseURL}create.php`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log(response.data);
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
