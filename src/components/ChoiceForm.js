import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createChoice } from "../redux/actions/menusActions";

const ChoiceForm = (props) => {
  const [ussd_choice, setChoice] = useState("");
  const [ussd_name, setName] = useState("");
  const [ussd_new_state, setNewState] = useState("");
  const [status, setStatus] = useState("");
  const [lastupdated] = useState(new Date());
  const { isLoading } = props.menus;

  const save = (e) => {
    e.preventDefault();
    const data = {
      ussd_state: props.ussd_state.toString(),
      ussd_choice,
      ussd_name,
      ussd_new_state,
      status,
      lastupdated,
    };
    props.createChoice(data);
  };

  return (
    <>
      <Form onSubmit={save}>

        
        <Form.Group>
          <Form.Label>USSD Choice</Form.Label>
          <Form.Control
            type="number"
            className="form-control"
            value={ussd_choice}
            onChange={(e) => setChoice(e.target.value)}
            placeholder="Enter choice number"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            value={ussd_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter choice name"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>New State</Form.Label>
          <Form.Control
            type="number"
            className="form-control"
            value={ussd_new_state}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Enter new state number"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>

          <Form.Control
            as="select"
            size="md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="btn btn-dark btn-block">
          Add a new Choice
          {isLoading && <Spinner animation="border" />}
          {!isLoading && ""}
        </Button>
      </Form>
    </>
  );
};
const mapState = ({ menus }) => ({
  menus,
});
export default connect(mapState, { createChoice })(ChoiceForm);
