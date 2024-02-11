import React, { useState, useEffect } from "react";
import axios from "axios";
import AlumniList from "./components/AlumniList";

function App() {
  const [alumni, setAlumni] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [major, setMajor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [picture, setPicture] = useState(null);

  // Function to load all alumni
  const fetchAlumni = async () => {
    const response = await axios.get("http://localhost:8888/read.php");
    setAlumni(response.data);
  };

  // Hook to load alumni on component mount
  useEffect(() => {
    fetchAlumni();
  }, []);

  // Function to add a new alumni
  const addAlumni = async () => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("major", major);
    formData.append("picture", picture); // Add the picture file to formData

    const resp = await axios.post("http://localhost:8888/create.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(resp.data)

    fetchAlumni(); // Refresh the list
    setFirstname("");
    setLastname("");
    setEmail("");
    setLinkedin("");
    setMajor("");
  };

  // Function to update an alumni
  const updateAlumni = async () => {
    const formData = new FormData();
    formData.append("id", editId);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("major", major);
    if (picture) {
      formData.append("picture", picture); // Add the picture file to formData only if it has been changed
    }

    const response = await axios.post("http://localhost:8888/update.php", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data)
    fetchAlumni(); // Refresh the list
    // Reset fields
    setEditId(null);
    setIsEditing(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setLinkedin("");
    setMajor("");
    setPicture(null); // Reset picture
  };

  // Function to delete an alumni
  const deleteAlumni = async (id) => {
    const response = await axios.post("http://localhost/delete.php", { id });
    console.log("response", response.data)
    fetchAlumni(); // Refresh the list
  };

  // Function to set the form for editing
  const editForm = (alumni) => {
    setIsEditing(true);
    setEditId(alumni.id);
    setFirstname(alumni.firstname);
    setLastname(alumni.lastname);
    setEmail(alumni.email);
    setLinkedin(alumni.linkedin);
    setMajor(alumni.major);
  };

  return (
    <div>
      <h1>Alumni </h1>
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="LinkedIn Profile"
      />
      <input
        type="file"
        onChange={(e) => setPicture(e.target.files[0])} // Add this line in your component
        placeholder="Upload Image"
      />
      <input
        type="text"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="Major"
      />
      {isEditing ? (
        <button onClick={updateAlumni}>Update Alumni</button>
      ) : (
        <button onClick={addAlumni}>Add Alumni</button>
      )}

      <AlumniList
        alumni={alumni}
        editForm={editForm}
        deleteAlumni={deleteAlumni}
      />

      <ul>
        {alumni.map((alum) => (
          <li key={alum.id}>
            {alum.firstname} {alum.lastname} - {alum.email} - {alum.linkedin} -{" "}
            {alum.major}
            <br />
            <img
              style={{ width: "100px", height: "100px" }}
              src={`data:image/jpeg;base64,${alum.picture}`}
            />
            <button onClick={() => editForm(alum)}>Edit</button>
            <button onClick={() => deleteAlumni(alum.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
