import React, { useState, useEffect } from "react";
import AlumniList from "./components/AlumniList";
import AlumniForm from "./components/AlumniForm";
import { addAlumni, deleteAlumni, fetchAlumni, updateAlumni } from "./crud";
import { Row, Col, Affix } from "antd";

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
    console.log("deleting alumni with id: ", id);
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
      <h1
        style={{
          fontWeight: "bold",
        }}
      >
        Atlantis Alumni Management
      </h1>
      <h2
        style={{
          fontWeight: "normal",
        }}
      >
        Create, edit, and delete alumni to be displayed on the Atlantis
        homepage.
      </h2>
      <Row gutter={[16, 16]} /* This adds spacing between columns and rows */>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={6} /* Adjust these values based on your responsive layout needs */
        >
          <Affix
            offsetTop={
              40
            } /* Adjust this value to control the distance from the top */
          >
            <AlumniForm
              firstname={firstname}
              lastname={lastname}
              email={email}
              linkedin={linkedin}
              major={major}
              setFirstname={setFirstname}
              setLastname={setLastname}
              setEmail={setEmail}
              setLinkedin={setLinkedin}
              setMajor={setMajor}
              onSubmit={isEditing ? handleUpdateAlumni : handleAddAlumni}
              isEditing={isEditing}
              setPicture={setPicture}
            />
          </Affix>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={16}
          xl={
            18
          } /* Adjust these values based on your responsive layout needs */
        >
          <AlumniList
            alumni={alumni}
            editForm={editForm}
            deleteAlumni={handleDeleteAlumni}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
