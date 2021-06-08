import { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Switch,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { sharedAction } from "../../redux/actions/sharedAction";
import * as types from "../../redux/types";

const { Option } = Select;

const NewApp = () => {
  const [visible, setVisible] = useState(false);
  const [externalRouting, setExternalRouting] = useState(false);

  const dispatch = useDispatch();
  const response = useSelector((state) => state?.app?.newApp);
  const responseData = response?.data;

  const showDrawer = () => setVisible(true);

  const onClose = () => setVisible(false);

  // useEffect(() => {
  //   if (responseData?.error) return message.error(responseData?.error);
  //   if (responseData?.data) return message.success(responseData?.error);
  // }, [responseData]);

  const onFinish = (values) => {
    dispatch(sharedAction("post", "/apps", types.CREATE_NEW_APP, values));
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> New App
      </Button>
      <Drawer
        title="Create a new App"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              type="primary"
              key="submit"
              form="appForm"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form
          id="appForm"
          layout="vertical"
          initialValues={{ external_routing: false }}
          onFinish={onFinish}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="app_name"
                label="App Name"
                rules={[{ required: true, message: "Please enter app name" }]}
              >
                <Input placeholder="Please enter app name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="app_ussd_code"
                label="USD Code"
                rules={[
                  {
                    pattern: /^[*0-9]+$/,
                    required: true,
                    message: "Please enter USSD Code",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  addonBefore="*"
                  addonAfter="#"
                  placeholder="Please enter USSD Code"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                valuePropName="checked"
                name="external_routing"
                label="External Routing"
              >
                <Switch onChange={() => setExternalRouting(!externalRouting)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="routing_url"
                label="Routing URL"
                rules={[
                  {
                    required: externalRouting,
                    message: "Please enter a routing URL",
                  },
                ]}
              >
                <Input placeholder="Please enter Routing URL" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="request_format"
                label="Request Format"
                rules={[
                  { required: true, message: "Please choose the Format" },
                ]}
              >
                <Select placeholder="Please choose the Format">
                  <Option value="xml">XML</Option>
                  <Option value="json">JSON</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="app_status"
                label="Status"
                rules={[
                  { required: true, message: "Please choose the App Status" },
                ]}
              >
                <Select placeholder="Please choose the App Status">
                  <Option value="Active">Active</Option>
                  <Option value="Suspended">Suspended</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="app_owner"
                label="Owner"
                rules={[{ required: true, message: "Please enter the Owner" }]}
              >
                <Input placeholder="Please enter the Owner" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contact_person"
                label="Contact Person"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Contact Person",
                  },
                ]}
              >
                <Input placeholder="Please enter the Owner" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="telephone_number"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    min: 9,
                    max: 9,
                    message: "Please enter valid Phone Number",
                  },
                ]}
              >
                <Input
                  addonBefore="+250"
                  placeholder="Please enter Phone Number"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email_address"
                label="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please enter valid Email",
                  },
                ]}
              >
                <Input placeholder="Please enter the Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="class_name"
                label="Class Name"
                rules={[
                  { required: true, message: "Please enter the Class Name" },
                ]}
              >
                <Input placeholder="Please enter The Class Name" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default NewApp;
