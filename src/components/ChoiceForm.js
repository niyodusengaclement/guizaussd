import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createChoice, updateChoice } from "../redux/actions/choicesActions";

const ChoiceForm = (props) => {
  const [ussd_choice, setChoice] = useState("");
  const [ussd_name, setName] = useState("");
  const [ussd_new_state, setNewState] = useState("");
  const [status, setStatus] = useState("");
  const [ussd_state, setussd_state] = useState("");
  const [lastupdated] = useState(new Date());
  const {
    choices: { isLoading },
    details,
    editChoice,
  } = props;

  useEffect(() => {
    if (!editChoice) {
      setussd_state("");
      setChoice("");
      setName("");
      setNewState("");
      setStatus("");
      return setussd_state(props.ussd_state.toString());
    }
    setussd_state(details.ussd_state);
    setChoice(details.ussd_choice);
    setName(details.ussd_name);
    setNewState(details.ussd_new_state);
    setStatus(details.status);
  }, [details]);

  const save = (e) => {
    e.preventDefault();
    const data = {
      ussd_state,
      ussd_choice,
      ussd_name,
      ussd_new_state,
      status,
      lastupdated,
    };
    if (!editChoice) {
      return props.createChoice(data);
    }
    props.updateChoice(data, details.record_id);
  };
  const menus = props.menus.values.rows;
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
            as="select"
            size="md"
            value={ussd_new_state}
            onChange={(e) => setNewState(e.target.value)}
            placeholder="Enter new state number"
          >
            <option>Select the next state</option>
            {menus.length > 0
              ? menus.map((menu) => (
                  <option key={menu.state_id} value={menu.state_id}>
                    {menu.state_title}
                  </option>
                ))
              : null}
          </Form.Control>
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
          {!editChoice ? "Add a new Choice" : "Save changes"}
          {isLoading && <Spinner animation="border" />}
          {!isLoading && ""}
        </Button>
      </Form>
    </>
  );
};
const mapState = ({ menus, choices }) => ({
  menus,
  choices,
});
export default connect(mapState, { createChoice, updateChoice })(ChoiceForm);
