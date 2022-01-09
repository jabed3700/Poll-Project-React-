import React from "react";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";
import { Row,Col, Container } from "reactstrap";

import Polls from "./data/polls";
class App extends React.Component{
  render(){
    return(
      <div>
          <Container>
            <Row className="my-5">
                <Col md={4}>
                  <Sidebar/>
                </Col>
                <Col md={8}>
                  <MainContent />
                </Col>
            </Row>
          </Container>
      </div>
    )
  }
}
export default App;
