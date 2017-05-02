function updateState(projection, event, state) {
    return projection.handlers[event.__type](state, event);
}

export default ({ store, bus, projection }) => {
    const eventTypes = Object.keys(projection.handlers);
    const initialStateFunc = projection.initialState || (() => ({}));
    let state = initialStateFunc();

    const handler = event => (state = updateState(projection, event, state));

    let result = null;
    return () => {
        result =
            result ||
            store.loadEventsByTypes(eventTypes, handler).then(() => {
                bus.onEvent(eventTypes, handler);
            });

        return result.then(() => state);
    };
};
