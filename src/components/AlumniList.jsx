import React from "react";
import { Card, Button, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

/**
 * Renders a list of alumni cards.
 * @param {Object} props - The component props.
 * @param {Array} props.alumni - The array of alumni objects.
 * @param {Function} props.editForm - The function to edit an alumni.
 * @param {Function} props.deleteAlumni - The function to delete an alumni.
 * @returns {JSX.Element} - The rendered component.
 */
const AlumniList = ({ alumni, editForm, deleteAlumni }) => (
  <ul
    style={{
      display: "flex",
      flexWrap: "wrap",
      listStyleType: "none",
      padding: 0,
      margin: 0,
    }}
  >
    {alumni.map((alum) => (
      <li style={{ padding: 10 }} key={alum.id}>
        <AlumniCard
          alum={alum}
          editForm={editForm}
          deleteAlumni={deleteAlumni}
        />
      </li>
    ))}
  </ul>
);

/**
 * Renders an alumni card.
 * @param {Object} props - The component props.
 * @param {Object} props.alum - The alumni object.
 * @param {Function} props.editForm - The function to edit the alumni.
 * @param {Function} props.deleteAlumni - The function to delete the alumni.
 * @returns {JSX.Element} - The rendered component.
 */
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
              <LinkedinOutlined style={{ paddingLeft: 8 }} />
            </a>
          </p>
          <p>Student: {(alum.isStudent == 1) ? "Yes" : "No"}</p>
        </>
      }
    />
  </Card>
);

export default AlumniList;
