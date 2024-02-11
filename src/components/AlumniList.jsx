import React from "react";
import { Card, Button, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const AlumniList = ({ alumni, editForm, deleteAlumni }) => (
  <ul
    style={{
      display: "flex", // Use flex display to arrange children in a row
      flexWrap: "wrap", // Allow items to wrap to the next line
      listStyleType: "none", // Remove bullet points from list items
      padding: 0, // Reset padding to remove default ul padding
      margin: 0, // Optionally, reset margin to remove default ul margin
    }}
  >
    {alumni.map((alum) => (
      <li key={alum.id}>
        <AlumniCard
          alum={alum}
          editForm={editForm}
          deleteAlumni={deleteAlumni}
        />
      </li>
    ))}
  </ul>
);

const AlumniCard = ({ alum, editForm, deleteAlumni }) => (
  <Card
    style={{ width: 300, marginTop: 16 }}
    actions={[
      <Button icon={<EditOutlined />} onClick={() => editForm(alum)}>
        Edit
      </Button>,
      <Button
        danger
        icon={<DeleteOutlined />}
        onClick={() => deleteAlumni(alum.id)}
      >
        Delete
      </Button>,
    ]}
  >
    <Card.Meta
      avatar={<Avatar src={`data:image/jpeg;base64,${alum.picture}`} />}
      title={`${alum.firstname} ${alum.lastname}`}
      description={
        <>
          <p>Email: {alum.email}</p>
          <p>Major: {alum.major}</p>
          <p>
            LinkedIn:
            <a href={alum.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ marginLeft: 8 }} />
            </a>
          </p>
        </>
      }
    />
  </Card>
);

export default AlumniList;
