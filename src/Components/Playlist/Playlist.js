import React from 'react'
import ReactPlayer from 'react-player';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap'

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
			editID: null
		}
	}
	handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value})
  }
  handleUpdate = async event => {
    event.preventDefault();
    
    const { title, url } = this.state;
    console.log(title, url)
    this.props.updateTube({
    	id: this.state.editID,
    	title,
    	url
    })
    this.setState({editID: null})
  }
	render() {
		return (
			<div id="playlist-box">
				<div id="player-wrapper">
				 <ReactPlayer
          className='react-player'
          url= { this.props.currentTube.url }
          width='100%'
          height='100%'
          controls={true}
          light={true}
        />
				</div>
        <div id="list-wrapper">
        	{this.props.tubes.map((tube,i)=>
        		<div className="vid" key={i+"vid"}>
        		{(this.state.editID === tube.id)? 
        			<div className="vid-play edit">
        				<Form onSubmit={this.handleUpdate}>
								  <Form.Group controlId="formTitleTube">
								    <Form.Label>Title</Form.Label>
								    <Form.Control type="text" value={tube.title} name="title" onChange={this.handleChange}/>
								  </Form.Group>
								  <Form.Group controlId="formUrlTube">
								    <Form.Label>Video URL</Form.Label>
								    <Form.Control type="text" value={tube.url} name="url" onChange={this.handleChange}/>
								  </Form.Group>
									<Button variant="dark" type="submit">Save</Button>
							</Form>
        			</div>
        			:
        			<Hoc>
        			<div className="vid-play">
	        			<span className="prev" onClick={console.log('clicked!')}>
		        			<ReactPlayer
					          className='react-player'
					          url= { tube.url }
					          width='100%'
					          height='100%'
					          controls={true}
					          light={true}
					        />
					      </span>
				      	<span onClick={this.props.display(tube)}>{tube.title}</span>
				      </div>
				      <div className="options">
				      	<Button variant="danger" size="sm" onClick={this.props.display(tube)}>delete</Button>
				      	{'  '}
				      	<Button variant="warning" size="sm" onClick={this.setState({editID: tube.id})}>edit</Button>
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
	tubes : state.tube.tubes
})

const mapDispatchToProps = dispatch => ({
	display : tube => dispatch(displayTube(tube)),
	delete : tube => dispatch(removeTube(tube)),
	update : tube => dispatch(updateTube(tube)),
})

export default connect(mapStateToProps,mapDispatchToProps)(Playlist)