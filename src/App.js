import React from "react";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";
import { Row,Col, Container } from "reactstrap";

import Polls from "./data/polls.js";
import shortid from "shortid";
class App extends React.Component{
  state={
    polls:[],
    selectedPoll:{},
    searchTerm:'',
  }

  componentDidMount(){
    this.setState({polls:Polls})
    console.log(this.state.polls)
  }

  createPoll = poll =>{
    poll.id = shortid.generate()
    poll.created = new Date()
    poll.totalVote = 0
    poll.opinnions = []

    this.setState({
      polls:this.state.polls.concat(poll)
    })
  }

  deletePoll = pollId=>{
    const polls = this.state.polls.filter(p=>p.id !== pollId)
    this.setState({polls,selectedPoll:{}})
  }

  updatePoll = updatedPoll =>{
    const polls = [...this.state.polls]
    const poll = polls.find(p=>p.id===updatedPoll.id)

    poll.title = updatedPoll.title
    poll.description = updatedPoll.description
    poll.options = updatedPoll.options

    this.setState({polls})
  }

  selectPoll = pollId =>{
    const poll = this.state.polls.find(p=>p.id ===pollId)
    this.state({selectedPoll:poll})
  }

  handleSearch = searchTerm =>{}

  render(){
    return(
      <div>
          <Container>
            <Row className="my-5">
                <Col md={4}>
                  <Sidebar  polls={this.state.polls} searchTerm={this.state.searchTerm} handleSearch={this.handleSearch} selectPoll={this.selectPoll}/>
                </Col>
                <Col md={8}>
                  <MainContent  />
                </Col>
            </Row>
          </Container>
      </div>
    )
  }
}
export default App;
