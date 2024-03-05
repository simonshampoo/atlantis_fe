import React from "react";
import { Row, Col, Form, Input, Button, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AlumniForm = ({
  firstname,
  lastname,
  email,
  linkedin,
  major,
  isStudent,
  setFirstname,
  setLastname,
  setEmail,
  setLinkedin,
  setMajor,
  setIsStudent,
  onSubmit,
  isEditing,
  setPicture,
}) => {
  const handleBeforeUpload = (file) => {
    setPicture(file);
    return true;
  };

  const uploadButton = <Button icon={<UploadOutlined />}>Select Image</Button>;

  return (
    <Row
      justify="center"
      style={{
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ fontWeight: "normal" }}>Add, Edit, or Delete Alumni</h2>
      <Col>
        <Form layout="vertical">
          <Form.Item label="First Name">
            <Input
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item label="LinkedIn Profile">
            <Input
              required
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn Profile"
            />
          </Form.Item>
          <Form.Item label="Upload Image">
            {
              // TODO: FIX THIS
            }
            <Upload
              name="avatar"
              showUploadList={true}
              beforeUpload={handleBeforeUpload}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="Major">
            <Input
              required
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="Major"
            />
          </Form.Item>
          <Form.Item label="Current Student">
            <Radio.Group
              value={isStudent}
              onChange={(e) => setIsStudent(1)}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              {isEditing ? "Update Alumni" : "Add Alumni"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AlumniForm;
