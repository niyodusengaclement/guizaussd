import React, { useEffect } from "react";
import {
  Accordion,
  Card,
  Badge,
  Spinner,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { findOne } from "../../redux/actions/choicesActions";
import { connect } from "react-redux";
import "react-sortable-tree/style.css";

const ChoiceDetails = (props) => {
  const {
    details,
    choices: {
      isLoading,
      choice: { submenu, next_state },
    },
  } = props;
  useEffect(() => {
    props.findOneChoice({ record_id: details.record_id });
  }, [details]);
  return (
    <Row className="ml-3">
      <Col>
        <div className="col-states-lg">
          {isLoading && <Spinner animation="border" />}
          {!isLoading && !submenu && ""}
          {!isLoading && submenu && (
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Form.Label}
                  variant="link"
                  eventKey={details.record_id}
                >
                  {details.ussd_name} details{" "}
                  <Badge
                    variant={
                      details.status === "Inactive" ? "danger" : "success"
                    }
                  >
                    {details.status}
                  </Badge>
                </Accordion.Toggle>
              </Card.Header>
              <Card.Body>
                <h4>{details.ussd_name}</h4>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    USSD Choice:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={details.ussd_choice}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Current State:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={submenu.current_state.state_title}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Next State:
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={
                        !next_state ? "No next state" : next_state.state_title
                      }
                    />
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
          )}
        </div>
      </Col>
    </Row>
  );
};
const mapState = ({ choices }) => ({
  choices,
});
export default connect(mapState, {
  findOneChoice: findOne,
})(ChoiceDetails);
