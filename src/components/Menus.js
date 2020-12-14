import React, { useEffect, useState } from "react";
import {
  Accordion,
  Card,
  Badge,
  ListGroup,
  Form,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  findAll,
  deleteMenu,
  updateMenuOnDrop,
} from "../redux/actions/menusActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MenuForm from "./MenuForm";
import ChoiceForm from "./ChoiceForm";
import ChildForm from "./ChildForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";
import { findDifference } from "../utils/helpers";

const Menus = (props) => {
  const { isLoading, values, dragable } = props.menus;
  const [details, setDetails] = useState();
  const [view, setView] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [defaultTreeData, setDeafultTreeData] = useState([]);
  useEffect(() => {
    props.findAll();
  }, []);

  const handleChange = (data) => {
    const changes = findDifference(defaultTreeData, data);
    props.updateMenuOnDrop({ changes });
    setTreeData(data);
  };

  useEffect(() => {
    const rows =
      values && values.rows && values.rows.length > 0
        ? values.rows.map((val) => {
            const treeInfo = {
              state_id: val.state_id,
              expanded: true,
              title: (
                <div>
                  {val.state_title}
                  <Link
                    to="#"
                    onClick={() => handleAddChoice(val)}
                    className="pl-2"
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Add choice </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                    </OverlayTrigger>
                  </Link>
                  <Link
                    to="#"
                    onClick={() => handleAddChild(val)}
                    className="pl-1"
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Add child </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </span>
                    </OverlayTrigger>
                  </Link>
                  <Link
                    to="#"
                    onClick={() => handleShowDetails(val)}
                    className="pl-1"
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">view Details </Tooltip>
                      }
                    >
                      <span className="d-inline-block">
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                    </OverlayTrigger>
                  </Link>
                  <Link
                    to="#"
                    onClick={() => deleteMenu(val.state_id)}
                    className="pl-1"
                  >
                    <span className="text-danger">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">Delete Menu </Tooltip>
                        }
                      >
                        <span className="d-inline-block">
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </OverlayTrigger>
                    </span>
                  </Link>
                </div>
              ),
              children: val.choices.map((choice) => {
                const obj = {
                  record_id: choice.record_id,
                  title: choice.ussd_name,
                  ussd_new_state: choice.ussd_new_state,
                  expanded: true,
                  children: [],
                };
                return obj;
              }),
            };
            return treeInfo;
          })
        : [];
    setTreeData(rows);
    setDeafultTreeData(rows);
  }, [values.rows]);

  const handleShowDetails = (data) => {
    setView("");
    setDetails(data);
  };

  const handleAddChoice = (data) => {
    setView("choice_form");
    setDetails(data);
  };

  const handleAddMenu = (data) => {
    setView("menu_form");
    setDetails(data);
  };

  const handleAddChild = (data) => {
    setView("child_form");
    setDetails(data);
  };

  const deleteMenu = (state_id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      props.deleteMenu(state_id);
    }
  };

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
            <div style={{ height: 800 }}>
              <SortableTree
                treeData={treeData}
                isVirtualized={false}
                // canDrag={dragable}
                onChange={(treeData) => handleChange(treeData)}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>

      {!details && !view && ""}
      {details && !view && (
        <Col>
          <div className="col-states-lg">
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Form.Label}
                  variant="link"
                  eventKey={details.state_id}
                >
                  {details.state_title} Details{" "}
                  <Badge
                    variant={details.status === "failed" ? "danger" : "success"}
                  >
                    {details.status}
                  </Badge>
                </Accordion.Toggle>
              </Card.Header>
              <Card.Body>
                <p>{details.text_en}</p>
                <p>{details.text_fr}</p>
                <p>{details.text_kiny}</p>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    state_type:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.state_type}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    call_fxn_name:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.call_fxn_name}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    state_id:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.state_id}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    code:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.code}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    input_field_name:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.input_field_name}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    api_endpoint:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.api_endpoint}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    request_params:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.request_params}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    request_method:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.request_method}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    input_type:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.input_type}
                    />
                  </Col>
                </Form.Group>
                Choices
                <ListGroup>
                  {details.choices.length > 0 &&
                    details.choices.map(
                      ({ ussd_name, ussd_choice, record_id }) => (
                        <ListGroup.Item key={record_id}>
                          {ussd_choice}. {ussd_name}
                        </ListGroup.Item>
                      )
                    )}
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </Col>
      )}

      {!details && !view && ""}
      {view === "choice_form" && (
        <Col>
          <div className="col-states-lg">
            <Card>
              <Card.Header>
                Add Menu choice to `{details.state_title}`
              </Card.Header>
              <Card.Body>
                <ChoiceForm ussd_state={details.state_id} />
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
              <Card.Header>
                <h4> Add Menu</h4>
              </Card.Header>
              <Card.Body>
                <MenuForm />
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
              <Card.Header>
                <h4> Add Menu Child</h4>
              </Card.Header>
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
const mapState = ({ menus }) => ({
  menus,
});
export default connect(mapState, {
  findAll,
  deleteMenu,
  updateMenuOnDrop,
})(Menus);
