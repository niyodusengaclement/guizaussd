/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
  Button,
  Input,
  Space,
  Dropdown,
  Menu,
  Popconfirm,
  Col,
  Row,
} from "antd";
import {
  EllipsisOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as types from "../../redux/types";
import { sharedAction } from "../../redux/actions/sharedAction";
import NewApp from "./newApp";

const AppsTable = () => {
  const dispatch = useDispatch();
  const appResponse = useSelector((state) => state?.app);
  const response = appResponse?.allApps;
  const newAppResponse = appResponse?.newApp;
  const [searchText, setSearchText] = useState("");
  const [details, setDetails] = useState({});
  const [editable, setEditable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [titleType, setTitleType] = useState("normal");

  const apps = response?.data?.data || [];
  const newApp = newAppResponse?.data?.data || {};

  const dataSource = [...apps, newApp]?.filter((row) =>
    row?.app_name?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setSearchText("");
    dispatch(sharedAction("get", "/apps", types.GET_ALL_APPLICATIONS));
  }, [dispatch]);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const newAppHandler = () => {
    showDrawer();
    setEditable(false);
    setDetails({});
  };

  const editAppHandler = () => {
    showDrawer();
    setEditable(true);
  };

  const deleteHandler = () => {
    dispatch(
      sharedAction("delete", `/apps/${details?.app_id}`, types.DELETE_APP)
    );
  };

  const handleSearch = (selectedKey) => setSearchText(selectedKey);
  const titleHandler = (type) => {
    setSearchText("");
    setTitleType(type);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => editAppHandler()}>
          <EditOutlined />
          Edit
        </div>
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

  const Title =
    titleType === "normal" ? (
      <div className="col-title">
        <div>App Name</div>
        <div className="gwiza-mt-2 pointer">
          <SearchOutlined onClick={() => titleHandler("search")} />
        </div>
      </div>
    ) : (
      <Input
        prefix={<ArrowLeftOutlined onClick={() => titleHandler("normal")} />}
        placeholder="Search"
        allowClear
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
    );
  const columns = [
    {
      title: () => Title,
      dataIndex: "app_name",
      key: "app_name",
      render: (text, record) => (
        <Link to={"/apps/" + record.app_id}>{text}</Link>
      ),
    },
    {
      title: "USSD Code",
      dataIndex: "app_ussd_code",
      key: "app_ussd_code",
    },
    {
      title: "Owner",
      dataIndex: "app_owner",
      key: "app_owner",
      responsive: ["sm"],
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
      responsive: ["md"],
    },
    {
      title: "Phone Number",
      dataIndex: "telephone_number",
      key: "telephone_number",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email_address",
      key: "email_address",
      responsive: ["xl"],
    },
    {
      title: "Status",
      dataIndex: "app_status",
      key: "app_status",
      render: (text) => (
        <span>
          <Badge
            status={
              text === "Active"
                ? "success"
                : text === "Inactive"
                ? "error"
                : "default"
            }
          />
          {text[0]?.toUpperCase() + text?.slice(1, text?.length)}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          onClick={() => setDetails(record)}
          overlay={menu}
          trigger={["click"]}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table
      title={() => (
        <Row gutter={16}>
          <Col sm={{ span: 1 }} lg={{ span: 1 }}>
            <Button type="primary" onClick={() => newAppHandler()}>
              <PlusOutlined /> New App
            </Button>
            <NewApp
              details={details}
              editable={editable}
              showDrawer={showDrawer}
              closeDrawer={closeDrawer}
              visible={visible}
            />
          </Col>
        </Row>
      )}
      loading={response?.isLoading}
      columns={columns}
      dataSource={dataSource}
      rowKey="app_id"
    />
  );
};

export default AppsTable;
