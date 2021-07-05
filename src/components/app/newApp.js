import { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Switch,
  Upload,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { sharedAction } from "../../redux/actions/sharedAction";
import * as types from "../../redux/types";

const { Option } = Select;
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const NewApp = ({ details, visible, editable, showDrawer, closeDrawer }) => {
  const [form] = Form.useForm();
  const initialValues = {
    app_name: "",
    app_ussd_code: "",
    external_routing: false,
    routing_url: "",
    class_name: "",
    app_owner: "",
    contact_person: "",
    telephone_number: "",
    email_address: "",
  };
  const [externalRouting, setExternalRouting] = useState(false);

  const dispatch = useDispatch();

  const appResponse = useSelector((state) => state?.app);
  const updated = appResponse?.updated;
  const updatedApp = appResponse?.updatedApp;
  const newAppResponse = appResponse?.newApp;

  const newApp = newAppResponse?.data?.data;

  const onClose = () => closeDrawer();

  useEffect(() => {
    form.resetFields();
    if (editable) {
      const external_routing = +details?.external_routing === 1 ? true : false;
      details.external_routing = external_routing;
      setExternalRouting(external_routing);
      return form.setFieldsValue(details);
    }
  }, [form, details, editable]);

  useEffect(() => {
    if (newApp || updated) {
      onClose();
    }
  }, [form, newApp, updated, updatedApp]);

  console.log("details", details);
  const onFinish = (values) => {
    if (editable) {
      return dispatch(
        sharedAction(
          "put",
          `/apps/${details?.app_id}`,
          types.UPDATE_APP,
          values
        )
      );
    }
    dispatch(sharedAction("post", "/apps", types.CREATE_NEW_APP, values));
  };

  return (
    <>
      <Drawer
        title={editable ? "Edit App" : "Create a new App"}
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
          form={form}
          id="appForm"
          layout="vertical"
          initialValues={initialValues}
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
                label="USSD Code"
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
            <Col span={6}>
              <Form.Item
                valuePropName="checked"
                name="external_routing"
                label="External Routing"
              >
                <Switch onChange={() => setExternalRouting(!externalRouting)} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="request_format"
                label="Request Format"
                rules={[
                  {
                    required: externalRouting,
                    message: "Please choose the Format",
                  },
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
            <Col span={24}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drop file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Upload only one single PDF file
                </p>
              </Dragger>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
NewApp.propTypes = {
  details: PropTypes.object,
  editable: PropTypes.bool,
  visible: PropTypes.bool,
  showDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
NewApp.defaultProps = {
  editable: false,
  visible: false,
  details: {},
};
export default NewApp;
