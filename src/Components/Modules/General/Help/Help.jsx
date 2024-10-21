import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import "./Help.css";

const Help = () => {
  return (
    <div className="ecnContainer">
      <p>Help</p>
    <Container>
      <div className="text-right mb-3">
        <Button variant="success">
          <i className="fa fa-download"></i> Download Manual
        </Button>
      </div>
      <h5>For Any Query / Issue please contact:</h5>
      <div className="mt-3">
        <h6>From BSL -</h6>
        <Table bordered>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Narula</td>
              <td>rahul.narula@bharatseats.net</td>
              <td>+91 9540037028</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Kamal Kant</td>
              <td>kamal.kant@bharatseats.net</td>
              <td>+91 9716004449</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mt-3">
        <h6>From Infodart -</h6>
        <Table bordered>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Gajanan Kamble</td>
              <td>gajanan.kamble@infodartmail.com</td>
              <td>+91 7391049812</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
    </div>
  );
};

export default Help;
