import React from 'react'
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios'

import { connect } from 'react-redux';
import { newTube } from '../../Redux/tube/tube-actions.js'

import './AddTube.scss';

class AddTube extends React.Component {
	constructor(){
		super();
		this.state = {
			title: '',
			url: '',
			success: false,
			error: false,
			msg: "",
			inLoad: false
		}
	}
	handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value})
  }
  handleSubmit = async event => {
  	this.setState({inLoad: true})
    event.preventDefault();
    const { title, url } = this.state;
  	if(title && url){
	    console.log(title, url)	
	    axios
          .post('https://fast-dusk-92564.herokuapp.com/api/movies', 
          	{
              title,
	    				url
            })
            .then(response => {
            	if(response.data.data){
            	const { id, title, url } = response.data.data
                this.props.newTube({
						    	id,
						    	title,
						    	url
						    })
						  	this.setState({success: true, inLoad: false},()=>setTimeout(()=>this.setState({success: false, url: "", title: "", msg :""}),1750))
						  }
						  else console.log(response)
            })
            .catch(error=>this.setState({error: true, msg:error.message, inLoad: false},()=>setTimeout(()=>this.setState({error: false,}),1750)));
  	}
  	else{
  		this.setState({error: true, msg:"fill all please!", inLoad:false},()=>setTimeout(()=>this.setState({error: false}),1750))
  	}
  }

	render() {
		return (
			<div id="tube-box">
			<Form onSubmit={this.handleSubmit}>
			  <Form.Group controlId="formTitleTube">
			    <Form.Label>Title</Form.Label>
			    <Form.Control type="text" value={this.state.title} placeholder="Title of Tube" name="title" onChange={this.handleChange}/>
			  </Form.Group>
			  <Form.Group controlId="formUrlTube">
			    <Form.Label>Video URL</Form.Label>
			    <Form.Control type="text" value={this.state.url} placeholder="https://www.youtube.com/......" name="url" onChange={this.handleChange}/>
			  </Form.Group>
				<Button variant="dark" type="submit">
				{this.state.inLoad?
				<Spinner
      		as="span"
      		animation="border"
      		size="sm"
      		role="status"
      		aria-hidden="true"
    		/>:null}ADD</Button>
			</Form>
				<Button id="see-playlist" variant="outline-info" onClick={()=>{console.log('hello');this.props.handleShow()}}>See Playlist</Button>
				<Alert show={this.state.success} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <hr />
      </Alert>
     	<Alert show={this.state.error} variant="danger">
        <Alert.Heading>Failed, {this.state.msg}</Alert.Heading>
        <hr />
      </Alert>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	newTube : tube => dispatch(newTube(tube)),
})

export default connect(null ,mapDispatchToProps)(AddTube)