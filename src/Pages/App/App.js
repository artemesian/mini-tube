import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import axios from 'axios'

import { connect } from 'react-redux';

import AddTube from '../../Components/AddTube/AddTube';
import Playlist from '../../Components/Playlist/Playlist';
import { getTubes } from '../../Redux/tube/tube-actions.js'

import './App.scss';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show: false
		}
	}

	handleShow = () => this.setState({show: !this.state.show})

	componentDidMount(){
		axios
       	.get('https://fast-dusk-92564.herokuapp.com/api/movies')
        .then(response => {
        	if(response.data.data){this.props.getTubes(response.data.data.map(tube=>{return{id: tube.id, title: tube.title, url: tube.url }}))}
        		else {console.log(response)}
        })
        .catch(error=>console.log(error.message));
	}

	render(){
		console.log(this.state)
		return(
			<div id="app-container">
				<div id="logo-text">MINI-TUBE</div>
				<AddTube handleShow={this.handleShow}/>
				<Modal show={this.state.show} onHide={this.handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.currentTube.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<Playlist/>
        </Modal.Body>
      </Modal>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentTube : state.tube.currentTube,
	tubes : state.tube.tubes
})

const mapDispatchToProps = dispatch => ({
	getTubes :(tubes)=>dispatch(getTubes(tubes))
})

export default connect(mapStateToProps,mapDispatchToProps)(App)