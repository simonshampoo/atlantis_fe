import React from "react";
import { Row, Col, Form, Input, Button, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

/**
 * A form component for adding, editing, or deleting alumni.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.firstname - The first name of the alumni
 * @param {string} props.lastname - The last name of the alumni
 * @param {string} props.email - The email of the alumni
 * @param {string} props.linkedin - The LinkedIn profile URL of the alumni
 * @param {string} props.major - The major of the alumni
 * @param {number} props.isStudent - The current student status of the alumni (1 for Yes, 0 for No)
 * @param {function} props.setFirstname - The function to update the first name
 * @param {function} props.setLastname - The function to update the last name
 * @param {function} props.setEmail - The function to update the email
 * @param {function} props.setLinkedin - The function to update the LinkedIn profile URL
 * @param {function} props.setMajor - The function to update the major
 * @param {function} props.setIsStudent - The function to update the current student status
 * @param {function} props.onSubmit - The function to handle form submission
 * @param {boolean} props.isEditing - Indicates whether the form is in editing mode
 * @param {function} props.setPicture - The function to update the profile picture
 * @returns {JSX.Element} The AlumniForm component
 */
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
  /**
   * Handles the file upload before it is sent to the server.
   *
   * @param {File} file - The uploaded file
   * @returns {boolean} Whether the file should be uploaded or not
   */
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
            <Radio.Group value={isStudent} onChange={(e) => setIsStudent(e.target.value)}>
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
