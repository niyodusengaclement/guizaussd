/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { Table, Badge, Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import * as types from "../../redux/types";
import { sharedAction } from "../../redux/actions/sharedAction";
import NewApp from "../form/app";

const AppsTable = () => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state?.app?.allApps);
  const newAppResponse = useSelector((state) => state?.app?.newApp);
  const [searchText, setSearchText] = useState("");

  const apps = response?.data?.data || [];
  const newApp = newAppResponse?.data?.data || {};

  const dataSource = [...apps, newApp]?.filter((row) =>
    row?.app_name?.toLowerCase()?.includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setSearchText("");
    dispatch(sharedAction("get", "/apps", types.GET_ALL_APPLICATIONS));
  }, []);

  const handleSearch = (selectedKey) => setSearchText(selectedKey);

  const getColumnSearchProps = () => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => {
              confirm();
              setSearchText("");
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: () => <SearchOutlined />,
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        // eslint-disable-next-line react/destructuring-assignment
        textToHighlight={text?.toString()}
      />
    ),
  });

  const columns = [
    {
      title: "App Name",
      dataIndex: "app_name",
      key: "app_name",
      ...getColumnSearchProps(),
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
      responsive: ["lg"],
    },
    {
      title: "External Routing",
      dataIndex: "external_routing",
      key: "external_routing",
      responsive: ["xl"],
    },
    {
      title: "Routing URL",
      dataIndex: "routing_url",
      key: "routing_url",
      responsive: ["xl"],
    },
    {
      title: "Format",
      dataIndex: "request_format",
      key: "request_format",
      responsive: ["lg"],
    },
    {
      title: "Class",
      dataIndex: "class_name",
      key: "class_name",
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
  ];

  return (
    <Table
      title={() => <NewApp />}
      loading={response?.isLoading}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default AppsTable;
