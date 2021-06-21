import React from "react";
import {
  Badge,
  Card,
  Col,
  Row,
  Empty,
  Descriptions,
  Dropdown,
  Menu,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { deleteChoice } from "../../../redux/actions/choicesActions";
import { deleteMenu } from "../../../redux/actions/menusActions";
import MenuForm from "./menuForm";

const MenuDetails = () => {
  const { app_id, menu_id } = useParams();
  const menus = useSelector((state) => state?.menus);
  const dispatch = useDispatch();

  const { isLoading, values } = menus;
  const details = values?.rows?.find(({ state_id }) => +state_id === +menu_id);

  const deleteHandler = () => {
    if (!details?.state_id) {
      return dispatch(deleteChoice(details.record_id));
    }
    dispatch(deleteMenu(app_id, details?.state_id));
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <MenuForm
          Icon={
            <>
              <EditOutlined />
              Edit
            </>
          }
          editable
          state={details}
        />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" danger>
        <Popconfirm
          title="Are you sure, you want to delete?"
          onConfirm={deleteHandler}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      {menu_id && (
        <Col span={14}>
          <Card
            title={
              <Row gutter={16}>
                <Col sm={{ span: 20 }} lg={{ span: 22 }}>
                  Menu details
                </Col>
                {details && (
                  <Col sm={{ span: 4 }} lg={{ span: 2 }}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <EllipsisOutlined />
                    </Dropdown>
                  </Col>
                )}
              </Row>
            }
            loading={isLoading}
            bordered={false}
          >
            {!details && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<p>Menu not found</p>}
              />
            )}
            {details && (
              <div>
                <Descriptions
                  title={
                    <>
                      {details.state_title}
                      {"  "}
                      <Badge
                        text={details.status}
                        status={
                          details.status === "failed" ? "error" : "success"
                        }
                      />
                    </>
                  }
                  size="small"
                >
                  <Descriptions.Item label="English Text" span={3}>
                    {details.text_en}
                  </Descriptions.Item>

                  <Descriptions.Item label="Kinyarwanda Text" span={3}>
                    {details.text_kin}
                  </Descriptions.Item>

                  <Descriptions.Item label="French Text" span={3}>
                    {details.text_fr}
                  </Descriptions.Item>

                  <Descriptions.Item label="State Type">
                    {details.state_type}
                  </Descriptions.Item>

                  <Descriptions.Item label="State ID">
                    {details.state_id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Code">
                    {details.code}
                  </Descriptions.Item>

                  <Descriptions.Item label="Input field name">
                    {details.input_field_name}
                  </Descriptions.Item>

                  <Descriptions.Item label="API endpoint">
                    {details.api_endpoint}
                  </Descriptions.Item>

                  <Descriptions.Item label="Request params">
                    {details.request_params}
                  </Descriptions.Item>

                  <Descriptions.Item label="Request method">
                    {details.request_method}
                  </Descriptions.Item>

                  <Descriptions.Item label="Input type">
                    {details.input_type}
                  </Descriptions.Item>

                  <Descriptions.Item label="Choices">
                    {details.input_type}
                  </Descriptions.Item>
                </Descriptions>
                Choices
                {details.choices.length > 0 &&
                  details.choices.map(
                    ({ ussd_name, ussd_choice, record_id }) => (
                      <p key={record_id}>
                        {ussd_choice}. {ussd_name}
                      </p>
                    )
                  )}
              </div>
            )}
          </Card>
        </Col>
      )}
    </>
  );
};

export default MenuDetails;
