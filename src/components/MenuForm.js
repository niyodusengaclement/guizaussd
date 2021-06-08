import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { createMenu, updateMenu } from "../redux/actions/menusActions";

const MenuForm = (props) => {
  const [state_type, setstate_type] = useState("");
  const [state_title, setstate_title] = useState("");
  const [state_indicator, setstate_indicator] = useState("");
  const [input_type, setinput_type] = useState("");
  const [input_field_name, setinput_field_name] = useState("");
  const [text_en, settext_en] = useState("");
  const [text_fr, settext_fr] = useState("");
  const [text_kin, settext_kin] = useState("");
  const [fxn_call_flag, setfxn_call_flag] = useState("");
  const [call_fxn_name, setcall_fxn_name] = useState("");
  const [api_call_flag, setapi_call_flag] = useState("");
  const [api_endpoint, setapi_endpoint] = useState("");
  const [request_method, setrequest_method] = useState("");
  const [request_params, setrequest_params] = useState("");
  const [code, setcode] = useState("");
  const [fxn_type, setfxn_type] = useState("");
  const [default_resp_code, setdefault_resp_code] = useState("");
  const [referenced_fields, setreferenced_fields] = useState("");
  const [status, setstatus] = useState("");
  const {
    menus: { btnLoading },
    details,
    editMenu,
  } = props;

  useEffect(() => {
    if (editMenu) {
      setstate_type(details.state_type);
      setstate_title(details.state_title);
      setstate_indicator(details.state_indicator);
      setinput_type(details.input_type);
      setinput_field_name(details.input_field_name);
      settext_en(details.text_en);
      settext_fr(details.text_fr);
      settext_kin(details.text_kin);
      setfxn_call_flag(details.fxn_call_flag);
      setcall_fxn_name(details.call_fxn_name);
      setapi_call_flag(details.api_call_flag);
      setapi_endpoint(details.api_endpoint);
      setrequest_method(details.request_method);
      setrequest_params(details.request_params);
      setcode(details.code);
      setfxn_type(details.fxn_type);
      setdefault_resp_code(details.default_resp_code);
      setreferenced_fields(details.referenced_fields);
      setstatus(details.status);
    }
  }, [details]);

  const save = (e) => {
    e.preventDefault();
    const data = {
      state_type,
      state_title,
      state_indicator,
      input_type,
      input_field_name,
      text_en,
      text_fr,
      text_kin,
      fxn_call_flag: +fxn_call_flag,
      call_fxn_name,
      api_call_flag,
      api_endpoint,
      request_method,
      request_params,
      code: +code,
      fxn_type,
      default_resp_code: +default_resp_code,
      referenced_fields,
      status,
    };

    if (!editMenu) {
      return props.createMenu(data);
    }
    props.updateMenu(data, details.state_id);
  };
  return (
    <>
      <Form onSubmit={save}>
        <Form.Group>
          <Form.Label>State title:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setstate_title(e.target.value)}
            defaultValue={state_title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State indicator:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            value={state_indicator}
            onChange={(e) => setstate_indicator(e.target.value)}
            defaultValue={state_indicator}
          >
            <option value="">Select state indicator</option>
            <option value="FC">FC</option>
            <option value="FB">FB</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>English text:</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            className="form-control"
            onChange={(e) => settext_en(e.target.value)}
            defaultValue={text_en}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>French text:</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => settext_fr(e.target.value)}
            defaultValue={text_fr}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Kinyarwanda text:</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            className="form-control"
            onChange={(e) => settext_kin(e.target.value)}
            defaultValue={text_kin}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>FXN call flag:</Form.Label>

          <Form.Control
            type="number"
            className="form-control"
            onChange={(e) => setfxn_call_flag(e.target.value)}
            defaultValue={fxn_call_flag}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>API call flag:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setapi_call_flag(e.target.value)}
            defaultValue={api_call_flag}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>FXN type:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            onChange={(e) => setfxn_type(e.target.value)}
            defaultValue={fxn_type}
            value={fxn_type}
          >
            <option value="">Select FXN type</option>
            <option value="api_triggering">API triggering</option>
            <option value="referencing">Referencing</option>
            <option value="non_referencing">Non referencing</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Defaut response type:</Form.Label>

          <Form.Control
            type="number"
            className="form-control"
            onChange={(e) => setdefault_resp_code(e.target.value)}
            defaultValue={default_resp_code}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Referenced field:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setreferenced_fields(e.target.value)}
            defaultValue={referenced_fields}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            defaultValue={status}
          >
            <option value="">Select Status</option>
            <option value="successful">Successful</option>
            <option value="failed">Failed</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>State type:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            onChange={(e) => setstate_type(e.target.value)}
            defaultValue={state_type}
            value={state_type}
          >
            <option value="">Select State type</option>
            <option value="input">Input</option>
            <option value="menuchoice">Menu choice</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Call FXN name:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setcall_fxn_name(e.target.value)}
            defaultValue={call_fxn_name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Code:</Form.Label>

          <Form.Control
            type="number"
            className="form-control"
            onChange={(e) => setcode(e.target.value)}
            defaultValue={code}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Input field name:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setinput_field_name(e.target.value)}
            defaultValue={input_field_name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>API endpoint:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setapi_endpoint(e.target.value)}
            defaultValue={api_endpoint}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Request params:</Form.Label>

          <Form.Control
            type="text"
            className="form-control"
            onChange={(e) => setrequest_params(e.target.value)}
            defaultValue={request_params}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Request method:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            onChange={(e) => setrequest_method(e.target.value)}
            defaultValue={request_method}
            value={request_method}
          >
            <option value="">Select request method</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Input type:</Form.Label>

          <Form.Control
            as="select"
            size="md"
            onChange={(e) => setinput_type(e.target.value)}
            defaultValue={input_type}
            value={input_type}
          >
            <option value="">Select input type</option>
            <option value="alphabetic">Alphabetic</option>
            <option value="numeric">Numeric</option>
            <option value="alphanumeric">Alphanumeric</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit" className="btn btn-dark btn-block">
          {!editMenu ? "Add a new State" : "Save changes"}
          {btnLoading && <Spinner animation="border" />}
          {!btnLoading && ""}
        </Button>
      </Form>
    </>
  );
};

const mapState = ({ menus }) => ({
  menus,
});
export default connect(mapState, { createMenu, updateMenu })(MenuForm);