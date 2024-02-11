// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AlumniForm from "./components/AlumniForm";
import AlumniList from "./components/AlumniList";

function App() {
  const [alumni, setAlumni] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAlumni, setCurrentAlumni] = useState({
    firstname: "",
    lastname: "",
    email: "",
    linkedin: "",
    major: "",
    picture: null,
  });

  const fetchAlumni = async () => {
    const response = await axios.get("http://localhost:8888/read.php");
    setAlumni(response.data);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleInputChange = (name, value) => {
    setCurrentAlumni((prev) => ({ ...prev, [name]: value }));
  };

  const setPicture = (file) => {
    setCurrentAlumni((prev) => ({ ...prev, picture: file }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(currentAlumni).forEach(([key, value]) => {
      if (key !== "id") {
        formData.append(key, value);
      }
    });

    const url = isEditing
      ? "http://localhost:8888/update.php"
      : "http://localhost:8888/create.php";
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);

    fetchAlumni(); // Refresh the list
    setCurrentAlumni({
      firstname: "",
      lastname: "",
      email: "",
      linkedin: "",
      major: "",
      picture: null,
    });
    setIsEditing(false);
  };

  const editForm = (alumni) => {
    setIsEditing(true);
    setCurrentAlumni(alumni);
  };

  const deleteAlumni = async (id) => {
    await axios.post("http://localhost:8888/delete.php", { id });
    fetchAlumni();
  };

  return (
    <div>
      <h1>Alumni</h1>
      <AlumniForm
        {...currentAlumni}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        setPicture={setPicture}
      />
      <AlumniList
        alumni={alumni}
        editForm={editForm}
        deleteAlumni={deleteAlumni}
      />
    </div>
  );
}

export default App;
