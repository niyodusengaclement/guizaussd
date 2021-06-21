import React, { useEffect, useState } from "react";
import { Button, Card, Col, Empty } from "antd";
import { PlusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { findAll } from "../../../redux/actions/menusActions";
import {
  findAll as findAllChoices,
  updateMenuOnDrop,
} from "../../../redux/actions/choicesActions";
import { useDispatch, useSelector } from "react-redux";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import { useParams, useHistory } from "react-router-dom";
import MenuChildForm from "./menuChildForm";
import MenuForm from "./menuForm";

const MenusTree = () => {
  const { app_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const choices = useSelector((state) => state?.choices);
  const menus = useSelector((state) => state?.menus);

  const { isLoading, values, dragable } = menus;
  const [treeData, setTreeData] = useState([]);

  const defaultMenu = menus?.values?.rows?.find(
    ({ is_app_default }) => is_app_default
  );

  useEffect(() => {
    dispatch(findAllChoices());
    dispatch(findAll(app_id));
  }, [dispatch, app_id]);

  const findNextState = (val) => {
    const state =
      values && values.rows && values.rows.length > 0
        ? values.rows.find(({ state_id }) => +state_id === +val.ussd_new_state)
        : null;
    return state;
  };

  const handleShowDetails = (data) => {
    if (!data?.ussd_new_state) {
      return history.push(`/apps/${app_id}/${data?.state_id}`);
    }
    const state = findNextState(data);
    return history.push(`/apps/${app_id}/${state?.state_id}`);
  };

  const handleChange = (data) => setTreeData(data);

  const titleDiv = (val) => {
    const new_title = !val.ussd_new_state
      ? ""
      : findNextState(val) && findNextState(val).state_title
      ? findNextState(val).state_title
      : "";
    const title = !val.ussd_new_state ? val.state_title : new_title;
    if (title) {
      return (
        <div>
          <span onClick={() => handleShowDetails(val)} className="gwiza-mr-3">
            {title}
          </span>
          <MenuChildForm Icon={PlusCircleOutlined} state={val} />
        </div>
      );
    }
    return null;
  };

  const loopOverChoices = (curr_state) => findChildren(curr_state);
  const findChildren = (curr_state) => {
    const kids =
      choices.values.length > 0 &&
      +curr_state.ussd_choice !== 0 &&
      curr_state.status === "Active"
        ? choices.values
            .filter((obj) => +obj.ussd_state === +curr_state.ussd_new_state)
            .map((val) => {
              val.state_title = val.ussd_name;
              const ch = {
                ...val,
                title: titleDiv(val),
                children: loopOverChoices(val),
              };
              return ch;
            })
        : [];
    return kids;
  };

  useEffect(() => {
    const rows =
      values && values?.rows && values?.rows?.length > 0
        ? values?.rows
            ?.filter(({ is_app_default }) => is_app_default)
            ?.map((val) => {
              const treeInfo = {
                state_id: val.state_id,
                expanded: true,
                title: titleDiv(val),
                children:
                  val.choices && val.choices.length > 0
                    ? val.choices.map((choice) => {
                        choice.state_title = choice.ussd_name;
                        const obj = {
                          record_id: choice.record_id,
                          title: titleDiv(choice),
                          ussd_new_state: choice.ussd_new_state,
                          expanded: true,
                          children: findChildren(choice),
                        };
                        return obj;
                      })
                    : [],
              };
              return treeInfo;
            })
        : [];
    setTreeData(rows);
  }, [values.rows]);

  const onmoveNode = ({ nextParentNode: { children, ussd_new_state } }) => {
    dispatch(updateMenuOnDrop({ changes: children }, ussd_new_state));
  };

  return (
    <Col span={10}>
      <Card
        title="App Menus"
        loading={isLoading}
        bordered={false}
        extra={[
          <>
            {!defaultMenu && (
              <MenuForm
                Icon={
                  <Button type="primary">
                    <PlusOutlined /> New Menu
                  </Button>
                }
              />
            )}
          </>,
        ]}
      >
        {!defaultMenu && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<p>Menus not found</p>}
          />
        )}
        {defaultMenu && (
          <div
            style={{ minHeight: 500, overflowY: "hidden", overflowX: "auto" }}
          >
            <SortableTree
              treeData={treeData}
              isVirtualized={false}
              canDrag={dragable}
              onMoveNode={onmoveNode}
              theme={FileExplorerTheme}
              onChange={(treeData) => handleChange(treeData)}
            />
          </div>
        )}
      </Card>
    </Col>
  );
};

export default MenusTree;
