// AlumniForm.js
import React from "react";
import { Input } from "antd";

const AlumniForm = ({
  firstname,
  lastname,
  email,
  linkedin,
  major,
  onInputChange,
  onSubmit,
  isEditing,
  setPicture,
}) => {
  return (
    <div >
      <Input
        type="text"
        value={firstname}
        onChange={(e) => onInputChange("firstname", e.target.value)}
        placeholder="First Name"
      />
      <Input
        type="text"
        value={lastname}
        onChange={(e) => onInputChange("lastname", e.target.value)}
        placeholder="Last Name"
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => onInputChange("email", e.target.value)}
        placeholder="Email"
      />
      <Input
        type="text"
        value={linkedin}
        onChange={(e) => onInputChange("linkedin", e.target.value)}
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
        onChange={(e) => onInputChange("major", e.target.value)}
        placeholder="Major"
      />
      <button onClick={onSubmit}>
        {isEditing ? "Update Alumni" : "Add Alumni"}
      </button>
    </div>
  );
};

export default AlumniForm;
