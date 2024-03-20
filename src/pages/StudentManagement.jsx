import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Radio,
  Upload,
  Avatar,
  message,
  Card,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const StudentManagement = () => {
  const [alumni, setAlumni] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAlumni, setCurrentAlumni] = useState(null);
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const handlePictureChange = ({ file, fileList }) => {
    // Limit the fileList to only the last selected file
    const latestFileList = fileList.slice(-1);

    setFileList(latestFileList);

    // If there's a file selected, read it as base64
    if (latestFileList.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        // This event is triggered once reading completed
        const base64 = reader.result;
        // Set the base64 string to the form. Ensure you have a field 'pictureBase64' in your backend model
        form.setFieldsValue({ pictureBase64: base64 });
      };
      reader.onerror = (error) => {
        // Handle errors
        console.log("Error reading file:", error);
        message.error("Failed to read file");
      };
      reader.readAsDataURL(file.originFileObj);
    } else {
      // Clear the value in the form if no file is selected
      form.setFieldsValue({ pictureBase64: null });
    }
  };

  const baseURL = "http://34.204.247.99/";

  const fetchAlumni = async () => {
    const response = await axios.get(`${baseURL}read.php`);
    setAlumni(response.data);
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const showModal = (alumni = null) => {
    setCurrentAlumni(alumni);
    setIsModalVisible(true);
    if (alumni) {
      form.setFieldsValue(alumni);
    } else {
      form.resetFields();
    }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      if (currentAlumni) {
        await axios.post(`${baseURL}/update.php`, {
          ...values,
          id: currentAlumni.id,
        });
        message.success("Alumni updated successfully");
      } else {
        await axios.post(`${baseURL}/create.php`, values);
        message.success("Alumni added successfully");
      }
      setIsModalVisible(false);
      fetchAlumni();
    } catch (error) {
      console.error("Operation failed:", error);
      message.error("Operation failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${baseURL}/delete.php`, { id });
      message.success("Alumni deleted successfully");
      fetchAlumni();
    } catch (error) {
      console.error("Delete failed:", error);
      message.error("Delete failed.");
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => showModal()}
        icon={<PlusOutlined />}
      >
        Add Alumni
      </Button>
      <Row gutter={16}>
        {alumni.map((alumnus) => (
          <Col key={alumnus.id} span={8}>
            <Card
              title={`${alumnus.firstname} ${alumnus.lastname}`}
              bordered={false}
              actions={[
                <Button
                  key="edit"
                  type="link"
                  onClick={() => showModal(alumnus)}
                >
                  Edit
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  onClick={() => handleDelete(alumnus.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar src={`data:image/jpeg;base64,${alumnus.picture}`} />
                }
                title={`${alumnus.firstname} ${alumnus.lastname}`}
                description={
                  <>
                    <p>Email: {alumnus.email}</p>
                    <p>Major: {alumnus.major}</p>
                    <p>
                      LinkedIn:
                      <a
                        href={alumnus.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LinkedinOutlined style={{ paddingLeft: 8 }} />
                      </a>
                    </p>
                    <p>Student: {alumnus.isStudent == 1 ? "Yes" : "No"}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={currentAlumni ? "Edit Alumni" : "Add Alumni"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="major"
            label="Major"
            rules={[{ required: true, message: "Please input your major!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedin"
            label="LinkedIn Profile"
            rules={[
              {
                required: true,
                message: "Please input your LinkedIn profile URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isStudent" label="Current Student">
            <Radio.Group>
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="pictureBase64"
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              name="picture"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false} // Prevent the automatic upload
              onChange={handlePictureChange}
            >
              {fileList.length >= 1 ? (
                <img
                  src={fileList[0].thumbUrl}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <Button icon={<UploadOutlined />}>Select Image</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          {/* Form fields */}
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
