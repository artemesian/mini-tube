import React from 'react'
import ReactPlayer from 'react-player';
import { Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';

import Hoc from '../Hoc/Hoc.js'
import { connect } from 'react-redux';
import { displayTube, removeTube, updateTube } from '../../Redux/tube/tube-actions.js'

import play from '../../Assets/play.svg';
import './Playlist.scss'

class Playlist extends React.Component {
	constructor(){
		super();
		this.state = {
			title: '',
			url: '',
			editID: null,
			inLoad: ''
		}
	}
	handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value})
  }

  handleUpdate = (event,tube) => {
  	event.preventDefault()
		this.setState({inLoad: 'edit'+tube.id})
    let { title, url } = this.state;
    
    console.log(title, url)
    axios.put('https://fast-dusk-92564.herokuapp.com/api/movies/' + this.state.editID, { id: this.state.editID, url: this.state.url, title: this.state.title })
     .then(response => {
     	if(response.data.data){
        const { id, title, url } = response.data.data
        this.props.updateTube({
					id,
					title,
				  url
				})
    		this.setState({editID: null, title: "", url: "", inLoad:''})	
    	}
    	else console.log(response)
      })
      .catch(error=>console.log(error.message));
  }

  handleDelete = tube => {
  	this.setState({inLoad: 'del'+tube.id})
    axios.delete('https://fast-dusk-92564.herokuapp.com/api/movies/' + tube.id)
     .then(response => {
        this.props.deleteTube(tube)
        this.setState({inLoad: ''})
        console.log('Tube deleted!')
      })
      .catch(error=>console.log(error.message));
  }
	render() {
		return (
			<div id="playlist-box">
				<div id="player-wrapper">
				{!this.props.tubes.length?
					<h1>{this.props.loadingState==="Loading"?<Spinner animation="border" />: this.props.loadingState}</h1>
				:
				 <ReactPlayer
          className='react-player'
          url= { this.props.currentTube.url }
          width='100%'
          height='100%'
          controls={true}
          light={true}
        />
      	}
				</div>
        <div id="list-wrapper">
        	{this.props.tubes.map((tube,i)=>
        		<div className="vid" key={i+"vid"}>
        		{(this.state.editID === tube.id)? 
        			<div className="vid-play">
        				<Form onSubmit={(e)=>this.handleUpdate(e,tube)} className="edit">
								  <Form.Group controlId="formTitleTubeE">
								    <Form.Label>Title</Form.Label>
								    <Form.Control type="text" defaultValue={tube.title} name="title" onChange={this.handleChange}/>
								  </Form.Group>
								  <Form.Group controlId="formUrlTubeE">
								    <Form.Label>Video URL</Form.Label>
								    <Form.Control type="text" defaultValue={tube.url} name="url" onChange={this.handleChange}/>
								  </Form.Group>
									<Button variant="dark" type="submit">
									{this.state.inLoad==='edit'+tube.id?
										<Spinner
						      		as="span"
						      		animation="border"
						      		size="sm"
						      		role="status"
						      		aria-hidden="true"
						    		/>:null}Save</Button>
							</Form>
        			</div>
        			:
        			<Hoc>
        			<div className="vid-play">
	        			<span className="prev" onClick={()=>console.log('clicked!')}>
		        			<ReactPlayer
					          className='react-player'
					          url= { tube.url }
					          width='100%'
					          height='100%'
					          controls={true}
					          light={true}
					        />
					      </span>
				      	<span onClick={()=>this.props.display(tube)}>{tube.title}</span>
				      </div>
				      <div className="options">
				      	<Button variant="danger" size="sm" onClick={()=>this.handleDelete(tube)}>
				      	{this.state.inLoad==='del'+tube.id?
									<Spinner
					      		as="span"
					      		animation="border"
					      		size="sm"
					      		role="status"
					      		aria-hidden="true"
					    		/>:null}delete</Button>
				      	{'  '}
				      	<Button variant="warning" size="sm" onClick={()=>this.setState({editID: tube.id,...tube})}>edit</Button>
				      </div>
				     </Hoc>
				    }
        		</div>
        	)}
        </div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentTube : state.tube.currentTube,
	tubes : state.tube.tubes,
	loadingState: state.tube.loadingState
})

const mapDispatchToProps = dispatch => ({
	display : tube => dispatch(displayTube(tube)),
	deleteTube : tube => dispatch(removeTube(tube)),
	updateTube : tube => dispatch(updateTube(tube)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Playlist)