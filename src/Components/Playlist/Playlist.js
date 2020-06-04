import React from 'react'
import ReactPlayer from 'react-player';

import { connect } from 'react-redux';
import { displayTube, removeTube, updateTube } from '../../Redux/tube/tube-actions.js'

import play from '../../Assets/play.svg';
import './Playlist.scss'

class Playlist extends React.Component {
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
        			<span className="vid-play"><img src={play} alt="play" className="img"/>{tube.title}</span>
        			<span className="duration">1:50</span>
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