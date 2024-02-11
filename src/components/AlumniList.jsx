import React from "react";
import { Card, Button, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const AlumniList = ({ alumni, editForm, deleteAlumni }) => (
      <ul>
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
)

const AlumniCard = ({ alum, editForm, deleteAlumni }) => (
  <Card
    style={{ width: 300, marginTop: 16 }}
    actions={[
      <Button
        type="primary"
        icon={<EditOutlined />}
        onClick={() => editForm(alum)}
      >
        Edit
      </Button>,
      <Button
        type="danger"
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