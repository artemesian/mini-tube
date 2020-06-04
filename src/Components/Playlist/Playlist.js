import React from 'react'
import ReactPlayer from 'react-player';

import { connect } from 'react-redux';
import { displayTube, removeTube, updateTube } from '../../Redux/tube/tube-actions.js'

class Playlist extends React.Component {
	render() {
		return (
			<div id="playlist-box">
				 <ReactPlayer
          className='react-player'
          url= { this.props.currentTube.url }
          width='100%'
          height='100%'
          controls={true}
          light={true}
        />
        <div id="list">
        	{[0,1,2].map((tube,i)=>
        		<div className="vid" key={i+"vid"}>
        			hello
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