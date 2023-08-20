// dispatcher.js
class Dispatcher {
    constructor() {
        this.listeners = [];
    }

    register(listener) {
        this.listeners.push(listener);
    }

    dispatch(action) {
        this.listeners.forEach(listener => listener(action));
    }
}

export default Dispatcher