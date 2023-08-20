import Dispatcher from "../dispatchers/dispatcher";
import fileExplorerStore from "../stores/store";

// actions.js
const actions = {
    addItem( parentId, fileType ) {
        dispatcher.dispatch( {
            type: 'ADD_NODE',
            payload: { fileType, parentId },
        } );
    },
    deleteItem( nodeId ) {
        dispatcher.dispatch( {
            type: 'DELETE_NODE',
            payload: { nodeId },
        } );
    },
    toggleItem( nodeId ) {
        dispatcher.dispatch( {
            type: 'TOGGLE_NODE',
            payload: { nodeId },
        } );
    },
    searchItem( searchLabel ) {
        dispatcher.dispatch( {
            type: 'SEARCH_AND_EXPAND_NODE',
            payload: { searchLabel: searchLabel },
        } );
    },
    toggleNodesExpandStatus( expandStatus ) {
        dispatcher.dispatch( {
            type: 'EXPAND_NODES',
            payload: { expandStatus },
        } );
    },
};

// Dispatcher Registeration
const dispatcher = new Dispatcher();
dispatcher.register( action => fileExplorerStore.handleAction( action ) );

export default actions;