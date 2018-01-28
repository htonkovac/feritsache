class StateManagement {
    states = []

    initClientState(clientId, initialState) {
        const foundState = this.states.find((state) => state.clientId === clientId)
        if (!foundState) {
            this.states.push({
                clientId,
                ...initialState
            })
        }
    }
}

module.exports = StateManagement