import React from 'react';
import {
  Container, Row, Col, Card,
} from 'react-bootstrap';

import LoginContainer from 'src/components/Login';
import SignUpContainer from 'src/components/SignUp';

const AuthorizationView = () => (
  <Container className="mt-3">
    <Row>
      <Col xs={6}>
        <Card className="text-center">
          <Card.Header>Log in</Card.Header>
          <Card.Body>
            <LoginContainer showLabel />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6}>
        <Card className="text-center">
          <Card.Header>Sign Up</Card.Header>
          <Card.Body>
            <SignUpContainer />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default AuthorizationView;
