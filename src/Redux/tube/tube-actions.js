import tubeActionTypes from './tube-types.js';

export const newTube = tube => ({
	type: tubeActionTypes.NEW_TUBE,
	payload: tube
})

export const displayTube = tube => ({
	type: tubeActionTypes.DISPLAY_TUBE,
	payload: tube
})

export const removeTube = tube => ({
	type: tubeActionTypes.REMOVE_TUBE,
	payload: tube
})

export const updateTube = tube => ({
	type: tubeActionTypes.UPDATE_TUBE,
	payload: tube
})