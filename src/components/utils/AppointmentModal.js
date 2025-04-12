'use client';

import React, { useEffect } from "react";
import {
  Modal,
  Input,
  Select,
  TimePicker,
  Button,
  Form,
  Space,
  notification,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAppointmentContext } from "../Context/AppointmentContext";
import { dummyDoctors } from "./DummyDoctorsList";
import { showNotification } from "./Notification";

export default function AppointmentModal({
  isModalOpen,
  setIsModalOpen,
  selectedSlot,
  editingAppointment,
  setEditingAppointment,
}) {
  const [form] = Form.useForm();
  const { allAppointments, setAllAppointments } = useAppointmentContext();

  useEffect(() => {
    if (isModalOpen && editingAppointment) {
      form.setFieldsValue({
        name: editingAppointment.name,
        category: editingAppointment.category,
        doctor: editingAppointment.doctor,
        startTime: editingAppointment.startTime
          ? dayjs(editingAppointment.startTime, "HH:mm")
          : null,
        endTime: editingAppointment.endTime
          ? dayjs(editingAppointment.endTime, "HH:mm")
          : null,
      });
    } else {
      form.resetFields();
    }
  }, [isModalOpen, editingAppointment, form]);

  const handleFinish = (values) => {
    const updatedAppointment = {
      ...values,
      slot: {
        date: selectedSlot.date,
        time: selectedSlot.time
      },
      id: editingAppointment?.id || Date.now(),
      startTime: values.startTime?.format("HH:mm"),
      endTime: values.endTime?.format("HH:mm"),
    };

    if (editingAppointment) {
      setAllAppointments(prev => prev.map(appt => appt.id === editingAppointment.id ? updatedAppointment : appt))
    } else {
      setAllAppointments(prev => [...prev, updatedAppointment]);
    }

    showNotification({
      type: 'success',
      message: editingAppointment ? "Appointment Updated" : "Appointment Booked",
      description: editingAppointment 
        ? "Your appointment details are successfully updated."
        : "Your appointment is successfully booked.",
      duration: 5,

    });

    handleClose();
  };

  const handleDelete = () => {
    setAllAppointments(prev => prev.filter(appt => appt.id !== editingAppointment.id));
    showNotification({
      type: 'error',
      message: 'Successfully Deleted',
      description: 'Your appointment is deleted successfully.',
      duration: 5,
    });
    handleClose();
  };

  const handleClose = () => {
    form.resetFields();
    setEditingAppointment(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* {contextHolder} */}
      <Modal
        title={editingAppointment ? "EDIT APPOINTMENT" : "NEW APPOINTMENT"}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="NAME"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="CATEGORY"
            name="category"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select category"
              options={[
                { label: "Consultation", value: "consultation" },
                { label: "Follow-up", value: "followup" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="DOCTOR"
            name="doctor"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select doctor"
              options={dummyDoctors}
            />
          </Form.Item>

          <div className="flex gap-3">
            <Form.Item
              label="START TIME"
              name="startTime"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>

            <Form.Item
              label="END TIME"
              name="endTime"
              rules={[{ required: true }]}
              className="flex-1"
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>
          </div>

          <Form.Item>
            <Space className="w-full justify-between">
              <Button type="primary" htmlType="submit" block>
                {editingAppointment ? "UPDATE" : "CREATE"}
              </Button>
              {editingAppointment && (
                <Button danger onClick={handleDelete} block>
                  DELETE
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}