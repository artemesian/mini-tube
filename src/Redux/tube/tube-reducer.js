import tubeActionTypes from './tube-types.js'

import { updateTubes, displayTube, deleteTube } from './tube-utils.js'

const INITIAL_STATE = {
	tubes: [],
	currentTube:{
	},
	loadingState: "Loading"
}

export const tubeReducer = (currentState=INITIAL_STATE, action={}) => {
	
	switch(action.type) {
			case tubeActionTypes.GET_TUBES:
				return ({
					...currentState,
					loadingState: 'NO TUBE',
					currentTube: action.payload.length?action.payload[0]:{},
					tubes: [...action.payload]
				})
			case tubeActionTypes.NEW_TUBE:
				return ({
					...currentState,
					currentTube: currentState.currentTube.id?currentState.currentTube: action.payload,
					tubes: [ ...currentState.tubes, action.payload ]
				})
			case tubeActionTypes.REMOVE_TUBE:
				return (deleteTube(currentState, action.payload))
			case tubeActionTypes.UPDATE_TUBE:
				return (updateTubes(currentState, action.payload))
			case tubeActionTypes.DISPLAY_TUBE:
				return (displayTube(currentState, action.payload))
			default:
				return currentState;
		}	
}
