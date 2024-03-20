import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Input, DatePicker, message } from "antd";
import moment from "moment"; // For handling date values

const TimelinePage = () => {
  const [entries, setEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(
        "http://34.204.247.99/timeline/read.php"
      );
      setEntries(response.data);
    } catch (error) {
      console.error("There was an error fetching the timeline entries:", error);
      message.error("Failed to fetch timeline entries.");
    }
  };

  const deleteEntry = async (id) => {
    try {
      const res = await axios.post("http://34.204.247.99/timeline/delete.php", {
        id,
      });
      message.success("Entry deleted successfully");
      fetchEntries();
    } catch (error) {
      console.error("Error deleting the entry:", error);
      message.error("Failed to delete the entry.");
    }
  };

  const showEditModal = (entry) => {
    setCurrentEntry(entry);
    form.setFieldsValue({
      title: entry.title,
      description: entry.description,
      due_date: moment(entry.due_date),
    });
    setIsModalVisible(true);
  };

  const handleEdit = async (values) => {
    const { title, description, due_date } = values;
    try {
      const res = await axios.post(
        " http://34.204.247.99/timeline/update.php",

        {
          id: currentEntry.id,
          title,
          description,
          due_date: due_date.format("YYYY-MM-DD"), // Format date to match your backend expectation
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res)
      message.success("Entry updated successfully");
      setIsModalVisible(false);
      fetchEntries();
    } catch (error) {
      console.error("Error updating the entry:", error);
      message.error("Failed to update the entry.");
    }
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAdd = async (values) => {
    try {
      const res = await axios.post(
        " http://34.204.247.99/timeline/create.php",
        {
          title: values.title,
          description: values.description,
          due_date: values.due_date.format("YYYY-MM-DD"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success("New entry added successfully.");
      setIsAddModalVisible(false);
      addForm.resetFields();
      fetchEntries();
    } catch (error) {
      console.log(values);
      console.error("Error adding the entry:", error);
      message.error("Failed to add the entry.");
    }
  };

  return (
    <div>
      <h1>Timeline</h1>
      <Button
        type="primary"
        onClick={showAddModal}
        style={{ marginBottom: "20px" }}
      >
        + Add Entry
      </Button>

      {entries.map((entry) => (
        <Card key={entry.id} title={entry.title} style={{ margin: "20px 0" }}>
          <p>{entry.description}</p>
          <p>Due Date: {entry.due_date}</p>
          <Button type="primary" onClick={() => showEditModal(entry)}>
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => deleteEntry(entry.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </Card>
      ))}
      <Modal
        title="Edit Entry"
        open={isModalVisible}
        onOk={form.submit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical" onFinish={handleEdit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="due_date"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add New Entry"
        open={isAddModalVisible}
        onOk={addForm.submit}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="due_date"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default TimelinePage;
