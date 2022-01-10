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
  }

  addNewPoll = poll =>{
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
    const poll = this.state.polls.find(p=>p.id === pollId)
    this.setState({selectedPoll:poll})
  }

  getOpinion = response =>{
    const {polls} = this.state
    const poll = polls.find(p=>p.id===response.pollId)
    
    const option = poll.options.find(
      o=>o.id===response.selectedOption
    )
   
    poll.totalVote++
    option.vote++

  
    const opinion = {
      id:shortid.generate(),
      name:response.name,
      selectedOption:response.selectedOption
    }

    // console.log(poll,option)
    // return

    poll.opinnions.push(opinion)
    this.setState({polls})
  } 

  handleSearch = searchTerm =>{
      this.setState({searchTerm})
  }

  performSearch = ()=>{
    return this.state.polls.filter(poll=>poll.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  }
  render(){
    const polls = this.performSearch()
    return(
      <div>
          <Container>
            <Row className="my-5">
                <Col md={4}>
                  <Sidebar
                    polls={polls} 
                    searchTerm={this.state.searchTerm}
                    handleSearch={this.handleSearch} 
                    selectPoll={this.selectPoll}
                    addNewPoll = {this.addNewPoll}
                  />
                </Col>
                <Col md={8}>
                  <MainContent  
                    poll={this.state.selectedPoll}
                    getOpinion = {this.getOpinion}
                    updatePoll={this.updatePoll}
                    deletePoll={this.deletePoll}
                  />
                </Col>
            </Row>
          </Container>
      </div>
    )
  }
}
export default App;
