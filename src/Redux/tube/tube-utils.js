export const updateTubes = ( state, newTube ) => {
	const existingTube = state.tubes.find( tube => tube.id === newTube.id );

	if (existingTube) {
		if(state.currentTube.id === newTube.id) {
			state.currentTube = {}
			if (state.tubes.length) {
				state.currentTube = state.tubes[0];
			}
		}
		return { ...state,currentTube: {...state.currentTube}, tubes: state.tubes.map( tube => 
			tube.id === newTube.id ? newTube : tube  )
		}
	}
}
export const deleteTube = ( state, newTube ) => {
	const existingTube = state.tubes.find( tube => tube.id === newTube.id );

	if (existingTube) {
		if(state.currentTube.id === newTube.id) {
			state.currentTube = {}
			console.log(state,newTube)
			state.tubes = state.tubes.filter(tube => tube.id !== newTube.id)
			if (state.tubes.length) {
				state.currentTube = state.tubes[0];
			}
		}
		return { ...state,currentTube: {...state.currentTube}, tubes: state.tubes.filter(tube => tube.id !== newTube.id)
		}
	}
}

export const displayTube = ( state, newTube ) => {
	const existingTube = state.tubes.find( tube => tube.id === newTube.id );

	if (existingTube) {
		state.currentTube = existingTube
	}

	return { ...state }

}
