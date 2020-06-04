import tubeActionTypes from './tube-types.js'

import { updateTubes, displayTube } from './tube-utils.js'

const INITIAL_STATE = {
	tubes: [],
	currentTube:{
		id: 1,
		title: 'ADD A DIV',
		url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
	}
}

export const tubeReducer = (currentState=INITIAL_STATE, action={}) => {
	
	switch(action.type) {
			case tubeActionTypes.NEW_ITEM:
				return ({
					...currentState,
					tubes: [ ...currentState.tubes, action.payload ]
				})
			case tubeActionTypes.REMOVE_TUBE:
				return ({
					...currentState,
					tubes: currentState.tubes.filter(tubeItem => tubeItem.id !== action.payload.id)
				})
			case tubeActionTypes.UPDATE_TUBE:
				return (updateTubes(currentState, action.payload))
			case tubeActionTypes.DISPLAY_TUBE:
				return (displayTube(currentState, action.payload))
			default:
				return currentState;
		}	
}
