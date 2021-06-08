import React from "react";
import { ListGroup, Form, Col, Row } from "react-bootstrap";
import { findAll, deleteMenu } from "../../redux/actions/menusActions";
import {
  findAll as findAllChoices,
  updateMenuOnDrop,
} from "../../redux/actions/choicesActions";
import { connect } from "react-redux";
import "react-sortable-tree/style.css";

const MenuDetails = (props) => {
  const { details } = props;
  return (
    <small>
      <p>{details.text_en}</p>
      <p>{details.text_fr}</p>
      <p>{details.text_kin}</p>
      <Form.Group as={Row}>
        <Form.Label column>State Type:</Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={details.state_type} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Call fxn name:
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
          State ID:
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={details.state_id} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Code:
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={details.code} />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Input field name:
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
          API endpoint:
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
          Request params:
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
          Request method:
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
          Input type:
        </Form.Label>
        <Col sm="9">
          <Form.Control plaintext readOnly defaultValue={details.input_type} />
        </Col>
      </Form.Group>
      Choices
      <ListGroup>
        {details.choices.length > 0 &&
          details.choices.map(({ ussd_name, ussd_choice, record_id }) => (
            <ListGroup.Item key={record_id}>
              {ussd_choice}. {ussd_name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </small>
  );
};
const mapState = ({ menus, choices }) => ({
  menus,
  choices,
});
export default connect(mapState, {
  findAll,
  findAllChoices,
  deleteMenu,
  updateMenuOnDrop,
})(MenuDetails);
