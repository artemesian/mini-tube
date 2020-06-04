export const updateTubes = ( tubes, newTube ) => {
	const existingTube = tubes.find( tube => tube.id === newTube.id );

	if (existingTube) {
		return tubes.map( tube => 
			tube.id === newTube.id ? { 
				...tube,
				quantity: tube.quantity + 1 
			} : tube  )
	}

	return [...tubes, {...newTube, quantity: 1}]

}

export const displayTube = ( tubes, newTube ) => {
	const existingTube = tubes.find( tube => tube.id === newTube.id );

	if (existingTube) {
		return tubes.map( tube => 
			tube.id === newTube.id ? { 
				...tube,
				quantity: tube.quantity + 1 
			} : tube  )
	}

	return [...tubes, {...newTube, quantity: 1}]

}
