import { useEffect, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createMenuChild } from "../../../redux/actions/menusActions";
import { useParams } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

const MenuChildForm = ({ state, Icon, editable }) => {
  const dispatch = useDispatch();
  const { app_id } = useParams();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const btnLoading = useSelector((state) => state?.menus?.btnLoading);

  const showDrawer = () => setVisible(true);

  const onClose = () => setVisible(false);

  const onFinish = (values) => {
    values.ussd_state = !state?.state_id
      ? state?.ussd_new_state
      : state?.state_id.toString();
    values.app_id = app_id;
    dispatch(createMenuChild(values));
  };

  useEffect(() => {
    if (editable) {
      form.setFieldsValue({
        ...state,
      });
    }
  }, [form, state, editable]);

  useEffect(() => {
    if (!btnLoading) {
      onClose();
    }
  }, [btnLoading]);

  const onFinishFailed = () => {
    message.error("There are errors in your form");
  };

  return (
    <>
      <Icon onClick={showDrawer} />
      <Drawer
        title={`Sub-menu of ${state?.state_title}`}
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
              form="submenuForm"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          id="submenuForm"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="ussd_choice"
                label="USSD Choice"
                rules={[
                  { required: true, message: "Please enter USSD Choice" },
                ]}
              >
                <Input placeholder="Please enter USSD Choice" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ussd_name"
                label="Choice name"
                rules={[
                  { required: true, message: "Please enter Choice name" },
                ]}
              >
                <Input placeholder="Please enter Choice name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state_title"
                label="State title"
                rules={[
                  {
                    required: true,
                    message: "Please enter State title",
                  },
                ]}
              >
                <Input placeholder="Please enter State title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="choiceStatus"
                label="Choice Status"
                rules={[
                  { required: true, message: "Please select Choice Status" },
                ]}
              >
                <Select placeholder="Please select Chioce Status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state_indicator"
                label="State Indicator"
                rules={[
                  { required: true, message: "Please select state indicator" },
                ]}
              >
                <Select placeholder="Please select state indicator">
                  <Option value="FC">FC</Option>
                  <Option value="FB">FB</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fxn_call_flag"
                label="FXN call flag"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message: "Please enter a FXN call flag",
                  },
                ]}
              >
                <Input placeholder="Please enter FXN call flag" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="api_call_flag"
                label="API call flag"
                rules={[
                  { required: true, message: "Please select API call flag" },
                ]}
              >
                <Input placeholder="Please select API call flag" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="fxn_type"
                label="FXN type"
                rules={[{ required: true, message: "Please select FXN type" }]}
              >
                <Select placeholder="Please select FXN type">
                  <Option value="api_triggering">API triggering</Option>
                  <Option value="referencing">Referencing</Option>
                  <Option value="non_referencing">Non referencing</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="default_resp_code"
                label="Default response code"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    required: true,
                    message: "Please enter Default response code",
                  },
                ]}
              >
                <Input placeholder="Please enter Default response code" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="referenced_fields"
                label="Referenced fields"
                rules={[
                  { required: true, message: "Please enter Referenced fields" },
                ]}
              >
                <Input placeholder="Please enter Referenced fields" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select placeholder="Please select status">
                  <Option value="successful">Successful</Option>
                  <Option value="failed">Failed</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state_type"
                label="State type"
                rules={[
                  { required: true, message: "Please select State type" },
                ]}
              >
                <Select placeholder="Please select State type">
                  <Option value="input">Input</Option>
                  <Option value="menuchoice">Menu Choice</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="call_fxn_name"
                label="Call fxn name"
                rules={[
                  {
                    required: true,
                    message: "Please enter valid Call fxn name",
                  },
                ]}
              >
                <Input placeholder="Please enter Call fxn name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message: "Please enter valid Code",
                  },
                ]}
              >
                <Input placeholder="Please enter Code" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="input_field_name"
                label="Input field name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Input field name",
                  },
                ]}
              >
                <Input placeholder="Please enter Input field name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="api_endpoint"
                label="API endpoint"
                rules={[
                  { required: true, message: "Please enter API endpoint" },
                ]}
              >
                <Input placeholder="Please enter API endpoint" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="request_params"
                label="Request params"
                rules={[
                  { required: true, message: "Please enter Request params" },
                ]}
              >
                <Input placeholder="Please enter Request params" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="request_method"
                label="Request method"
                rules={[
                  { required: true, message: "Please select Request method" },
                ]}
              >
                <Select placeholder="Please select Request method">
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="input_type"
                label="Input type"
                rules={[
                  { required: true, message: "Please select Input type" },
                ]}
              >
                <Select placeholder="Please select Request method">
                  <Option value="alphabetic">Alphabetic</Option>
                  <Option value="numeric">Numeric</Option>
                  <Option value="alphanumeric">Alphanumeric</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="class_name"
                label="Class name"
                rules={[{ required: true, message: "Please enter class name" }]}
              >
                <Input placeholder="Please enter class name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="text_en"
                label="English text"
                rules={[
                  {
                    required: true,
                    message: "Please enter English text",
                  },
                ]}
              >
                <TextArea placeholder="Please enter English text" rows={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="text_kin"
                label="Kinyarwanda text"
                rules={[
                  {
                    required: true,
                    message: "Please enter Kinyarwanda text",
                  },
                ]}
              >
                <TextArea
                  placeholder="Please enter Kinyarwanda text"
                  rows={4}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="text_fr"
                label="French text"
                rules={[
                  {
                    required: true,
                    message: "Please enter French text",
                  },
                ]}
              >
                <TextArea placeholder="Please enter French text" rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default MenuChildForm;
