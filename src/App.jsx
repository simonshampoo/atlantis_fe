import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import { UserOutlined, ScheduleOutlined } from "@ant-design/icons";
import { AuthProvider } from "./context/AuthContext.jsx";
import StudentManagement from "./pages/StudentManagement";
import Login from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import Timeline from "./pages/Timeline";

const { Header } = Layout;

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout className="layout">
          <PrivateRoute>
            <Header>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  <Link to="/student-management">Student Management</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ScheduleOutlined />}>
                  <Link to="/timeline">Timeline</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </PrivateRoute>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/student-management"
              element={
                <PrivateRoute>
                  <StudentManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/timeline"
              element={
                <PrivateRoute>
                  <Timeline />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
