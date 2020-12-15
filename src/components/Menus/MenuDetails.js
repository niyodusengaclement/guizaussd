import React from "react";
import {
  Accordion,
  Card,
  Badge,
  ListGroup,
  Form,
  Col,
  Row,
} from "react-bootstrap";
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
    <Row className="mt-5 ml-3">
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
  deleteMenu,
  updateMenuOnDrop,
})(MenuDetails);
