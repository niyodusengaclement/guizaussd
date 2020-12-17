import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { findAll, deleteMenu } from "../../redux/actions/menusActions";
import {
  findAll as findAllChoices,
  updateMenuOnDrop,
  deleteChoice,
} from "../../redux/actions/choicesActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MenuForm from "../MenuForm";
import ChoiceForm from "../ChoiceForm";
import ChildForm from "../ChildForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";
import { findDifference } from "../../utils/helpers";
import MenuDetails from "./MenuDetails";
import ChoiceDetails from "./ChoiceDetails";

const Menus = (props) => {
  const { isLoading, values, dragable } = props.menus;
  const [details, setDetails] = useState();
  const [view, setView] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [defaultTreeData, setDeafultTreeData] = useState([]);
  const [editMenu, setEditMenu] = useState(false);
  const [editChoice, setEditChoice] = useState(false);

  useEffect(() => {
    props.findAllChoices();
    props.findAll();
  }, []);

  const handleShowDetails = (data) => {
    setView("");
    setDetails(data);
  };

  const handleAddChoice = (data) => {
    setEditChoice(false);
    setView("choice_form");
    setDetails(data);
  };

  const handleAddMenu = (data) => {
    setEditMenu(false);
    setView("menu_form");
    setDetails(data);
  };

  const handleAddChild = (data) => {
    setView("child_form");
    setDetails(data);
  };

  const handleEdit = (data) => {
    setDetails(data);
    if (!data.state_id) {
      setEditChoice(true);
      return setView("choice_form");
    }
    setEditMenu(true);
    setView("menu_form");
  };

  const deleteMenu = (data) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      if (!data.state_id) {
        return props.deleteChoice(data.record_id);
      }
      props.deleteMenu(data.state_id);
    }
  };

  const handleChange = (data) => {
    const changes = findDifference(defaultTreeData, data);
    // console.log("Changes", changes);
    // props.updateMenuOnDrop({ changes });
    setTreeData(data);
  };

  const titleDiv = (val) => (
    <div>
      {val.state_title}
      {val.state_id && (
        <Link to="#" onClick={() => handleAddChoice(val)} className="pl-2">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Add choice </Tooltip>}
          >
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </OverlayTrigger>
        </Link>
      )}
      <Link to="#" onClick={() => handleAddChild(val)} className="pl-1">
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Add child </Tooltip>}
        >
          <span className="d-inline-block">
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        </OverlayTrigger>
      </Link>
      <Link to="#" onClick={() => handleEdit(val)} className="pl-1">
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">Edit </Tooltip>}
        >
          <span className="d-inline-block">
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </OverlayTrigger>
      </Link>
      <Link to="#" onClick={() => handleShowDetails(val)} className="pl-1">
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">view Details </Tooltip>}
        >
          <span className="d-inline-block">
            <FontAwesomeIcon icon={faEye} />
          </span>
        </OverlayTrigger>
      </Link>
      <Link to="#" onClick={() => deleteMenu(val)} className="pl-1">
        <span className="text-danger">
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Delete </Tooltip>}
          >
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </OverlayTrigger>
        </span>
      </Link>
    </div>
  );

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
        ? values.rows.map((val) => {
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
    setDeafultTreeData(rows);
  }, [values.rows]);

  return (
    <Row className="mt-5 ml-3">
      <Col lg={5} md={5} sm={12} xs={12} pl-0 pr-0>
        <Card className="col-states">
          <Card.Header>
            Menus
            <div className="float-right">
              <Link to="#" onClick={handleAddMenu}>
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">Add menu </Tooltip>}
                >
                  <span className="d-inline-block">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </span>
                </OverlayTrigger>
              </Link>
            </div>
          </Card.Header>
          <Card.Body>
            {isLoading && <Spinner animation="border" />}
            {!isLoading && (
              <div style={{ height: 800 }}>
                <SortableTree
                  treeData={treeData}
                  isVirtualized={false}
                  // canDrag={dragable}
                  canDrag={false}
                  onChange={(treeData) => handleChange(treeData)}
                />
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>

      {!details && !view && ""}
      {details && details.state_id && !view && (
        <MenuDetails details={details} />
      )}
      {details && details.record_id && !view && (
        <ChoiceDetails details={details} />
      )}

      {view === "choice_form" && (
        <Col>
          <div className="col-states-lg">
            <Card>
              <Card.Header>
                {!editChoice && `Add Menu choice to ${details.state_title}`}
                {editChoice && `Edit Menu choice`}
              </Card.Header>
              <Card.Body>
                <ChoiceForm
                  details={details}
                  editChoice={editChoice}
                  ussd_state={
                    !details.state_id ? details.ussd_state : details.state_id
                  }
                />
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}

      {!details && !view && ""}
      {view === "menu_form" && (
        <Col>
          <div className="col-states-lg">
            <Card>
              <Card.Header>{!editMenu ? "Add Menu" : "Edit menu"}</Card.Header>
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
          <div className="col-states-lg">
            <Card>
              <Card.Header>Add Menu Child</Card.Header>
              <Card.Body>
                <ChildForm parentState={details} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}

      <Col></Col>
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
