import React, { useState, useEffect } from "react";
import AlumniList from "./components/AlumniList";
import { Input } from "antd";
import { addAlumni, deleteAlumni, fetchAlumni, updateAlumni } from "./crud";

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

  useEffect(() => {
    fetchAlumni(setAlumni);
  }, []);

  const handleAddAlumni = async () => {
    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("major", major);
    formData.append("picture", picture);

    await addAlumni(formData, () => fetchAlumni(setAlumni));
    setFirstname("");
    setLastname("");
    setEmail("");
    setLinkedin("");
    setMajor("");
    setPicture(null);
  };

  const handleUpdateAlumni = async () => {
    const formData = new FormData();
    formData.append("id", editId);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("major", major);
    if (picture) {
      formData.append("picture", picture);
    }

    await updateAlumni(formData, () => fetchAlumni(setAlumni));
    setIsEditing(false);
    setEditId(null);
    setFirstname("");
    setLastname("");
    setEmail("");
    setLinkedin("");
    setMajor("");
    setPicture(null);
  };

  const handleDeleteAlumni = async (id) => {
    await deleteAlumni(id, () => fetchAlumni(setAlumni));
  };

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
      <Input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="First Name"
      />
      <Input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Last Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="LinkedIn Profile"
      />
      <Input
        type="file"
        onChange={(e) => setPicture(e.target.files[0])}
        placeholder="Upload Image"
      />
      <Input
        type="text"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        placeholder="Major"
      />
      {isEditing ? (
        <button onClick={handleUpdateAlumni}>Update Alumni</button>
      ) : (
        <button onClick={handleAddAlumni}>Add Alumni</button>
      )}

      <AlumniList
        alumni={alumni}
        editForm={editForm}
        deleteAlumni={handleDeleteAlumni}
      />
    </div>
  );
}

export default App;
