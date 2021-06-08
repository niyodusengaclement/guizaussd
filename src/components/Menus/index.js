import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Spinner,
  Badge,
} from "react-bootstrap";
import { findAll, deleteMenu } from "../../redux/actions/menusActions";
import {
  findAll as findAllChoices,
  updateMenuOnDrop,
  deleteChoice,
} from "../../redux/actions/choicesActions";
import { connect } from "react-redux";
import MenuForm from "../MenuForm";
import ChildForm from "../ChildForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusCircle,
  faTrash,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";
import MenuDetails from "./MenuDetails";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";

const Menus = (props) => {
  const { isLoading, values, dragable } = props.menus;
  const [details, setDetails] = useState();
  const [view, setView] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [editMenu, setEditMenu] = useState(false);

  useEffect(() => {
    props.findAllChoices();
    props.findAll();
  }, []);

  const findNextState = (val) => {
    const state =
      values && values.rows && values.rows.length > 0
        ? values.rows.find(({ state_id }) => state_id == val.ussd_new_state)
        : null;
    return state;
  };

  const handleShowDetails = (data) => {
    setView("");
    if (!data.ussd_new_state) {
      return setDetails(data);
    }
    const state = findNextState(data);
    return setDetails(state);
  };

  const handleAddChild = (data) => {
    setView("child_form");
    setDetails(data);
  };

  const handleEdit = (data) => {
    if (!data.state_id) {
      const state = findNextState(data);
      setDetails(state);
      setEditMenu(true);
      return setView("menu_form");
    }
    setEditMenu(true);
    setDetails(data);
    setView("menu_form");
  };

  const deleteMenu = (data) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      if (!data.state_id) {
        // const state = findNextState(data);
        return props.deleteChoice(data.record_id);
        // return props.deleteMenu(data.state_id);
      }
      props.deleteMenu(data.state_id);
    }
  };

  const handleChange = (data) => setTreeData(data);

  const titleDiv = (val) => {
    const new_title = !val.ussd_new_state
      ? ""
      : findNextState(val) && findNextState(val).state_title
      ? findNextState(val).state_title
      : "";
    return (
      <div>
        <small>
          <span
            onClick={() => handleShowDetails(val)}
            className="d-inline-block pl-1 hover-icon"
          >
            {!val.ussd_new_state ? val.state_title : new_title}
          </span>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Add child </Tooltip>}
          >
            <span
              onClick={() => handleAddChild(val)}
              className="d-inline-block pl-1 hover-icon"
            >
              <FontAwesomeIcon icon={faPlusCircle} />
            </span>
          </OverlayTrigger>
        </small>
      </div>
    );
  };

  const loopOverChoices = (curr_state) => findChildren(curr_state);
  const findChildren = (curr_state) => {
    const kids =
      props.choices.values.length > 0 &&
      +curr_state.ussd_choice !== 0 &&
      curr_state.status === "Active"
        ? props.choices.values
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
      values && values.rows && values.rows.length > 0
        ? values.rows
            .filter((row) => row.state_id === 1)
            .map((val) => {
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
    props.updateMenuOnDrop({ changes: children }, ussd_new_state);
  };

  const closeMenu = () => {
    setDetails(null);
    setView();
  };

  return (
    <Row className="">
      <Col lg={5} md={5} sm={12} xs={12}>
        <Card>
          <Card.Header>Menus</Card.Header>
          <Card.Body>
            {isLoading && <Spinner animation="border" />}
            {!isLoading && (
              <div style={{ minHeight: 500, fontSize: "20px" }}>
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
          </Card.Body>
        </Card>
      </Col>

      {!details && !view && ""}
      {details && details.state_id && !view && (
        <Col>
          <div>
            <Card>
              <Card.Header>
                {details.state_title}{" "}
                <Badge
                  variant={details.status === "failed" ? "danger" : "success"}
                >
                  {details.status}
                </Badge>
                <div className="float-right">
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Edit </Tooltip>}
                  >
                    <span
                      onClick={() => handleEdit(details)}
                      className="d-inline-block pl-3 hover-icon"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Delete </Tooltip>}
                  >
                    <span
                      onClick={() => deleteMenu(details)}
                      className="d-inline-block pl-3 hover-icon close-icon"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </OverlayTrigger>

                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Close </Tooltip>}
                  >
                    <span className="d-inline-block pl-3 hover-icon close-icon">
                      <FontAwesomeIcon
                        onClick={closeMenu}
                        icon={faWindowClose}
                      />
                    </span>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <MenuDetails details={details} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}

      {!details && !view && ""}
      {view === "menu_form" && (
        <Col>
          <div>
            <Card>
              <Card.Header>
                {!editMenu ? "Add Menu" : "Edit menu"}

                <div className="float-right">
                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Delete </Tooltip>}
                  >
                    <span
                      onClick={() => deleteMenu(details)}
                      className="d-inline-block pl-3 hover-icon close-icon"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </OverlayTrigger>

                  <OverlayTrigger
                    overlay={<Tooltip id="tooltip-disabled">Close </Tooltip>}
                  >
                    <span className="d-inline-block pl-3 hover-icon close-icon">
                      <FontAwesomeIcon
                        onClick={closeMenu}
                        icon={faWindowClose}
                      />
                    </span>
                  </OverlayTrigger>
                </div>
              </Card.Header>
              <Card.Body>
                <MenuForm editMenu={editMenu} details={details} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}

      {!details && !view && ""}
      {view === "child_form" && (
        <Col>
          <div>
            <Card>
              <Card.Header>
                Add Menu Child
                <span className="d-inline-block close-icon float-right">
                  <FontAwesomeIcon onClick={closeMenu} icon={faWindowClose} />
                </span>
              </Card.Header>
              <Card.Body>
                <ChildForm parentState={details} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}
    </Row>
  );
};
const mapState = ({ menus, choices }) => ({
  menus,
  choices,
});
export default connect(mapState, {
  findAll,
  findAllChoices,
  deleteChoice,
  deleteMenu,
  updateMenuOnDrop,
})(Menus);
