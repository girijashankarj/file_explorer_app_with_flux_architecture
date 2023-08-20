// store.js
import { ExpandStatus, FileTypes } from '../common/commonConstants';
import { applyInvertFilterFor3Seconds } from '../common/domOperations';
import { createNewItem, findNodeById, findParentPath, validateFileName } from '../common/utils';

class FileExplorerStore {
    constructor() {
        this.state = {
            id: 'rootFolder',
            label: 'Root Folder',
            fileType: FileTypes.FOLDER_TYPE,
            expanded: ExpandStatus.EXPAND,
            children: [],
        };
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    updateState( newState ) {
        this.state = newState;
        this.emitChange();
    }

    emitChange() {
        this.listeners.forEach( listener => listener() );
    }

    addChangeListener( listener ) {
        this.listeners.push( listener );
    }

    removeChangeListener( listener ) {
        this.listeners = this.listeners.filter( l => l !== listener );
    }

    handleAction( action ) {
        const { parentId, expanded, nodeId, searchLabel, fileType, expandStatus } = action.payload;
        switch ( action.type ) {
            case 'ADD_NODE':
                const itemName = prompt( `Enter ${fileType} name: ` );
                const validationResult = validateFileName( itemName, { ...this.state } );
                if ( validationResult ) {
                    alert( `Validation Failed: ${validationResult} ` );
                } else {
                    addNode( itemName, fileType, parentId );
                    this.updateState( { ...this.state } );
                }
                break;
            case 'DELETE_NODE':
                if ( nodeId == `rootFolder` ) {
                    alert( `Validation Failed: Cannot Delete Root Folder ` );
                } else {
                    const newState = this.deleteNodeRecursive( { ...this.state }, nodeId );
                    this.updateState( { ...newState } );
                }
                break;
            case 'TOGGLE_NODE':
                this.toggleNode( nodeId, expanded );
                this.updateState( { ...this.state } );
                break;
            case 'SEARCH_AND_EXPAND_NODE':
                const searchValidation = validateFileName( searchLabel, { ...this.state } );
                if ( searchValidation ) {
                    alert( `Search Validation Failed: ${searchValidation} ` );
                } else {
                    const parentPath = findParentPath( this.state, searchLabel );
                    if ( parentPath && parentPath.length > 0 ) {
                        this.expandNodesByParentPath( this.state, parentPath );
                        this.updateState( { ...this.state } );
                    } else {
                        alert( `File Not Found: ${searchLabel} ` );
                    }
                }
                break;
            case 'EXPAND_NODES':
                this.toggleNodesExpandStatus( this.state, expandStatus );
                this.updateState( { ...this.state } );
                break;
            default:
            // No-op
        }
    }

    addNode( itemName, fileType, parentId ) {
        const newItem = createNewItem( itemName, fileType )
        const parent = findNodeById( this.state, parentId );
        parent.children.push( newItem );
        parent.expanded = ExpandStatus.EXPAND;
    }

    deleteNodeRecursive( node, targetNodeId ) {
        if ( node.id === targetNodeId ) {
            return null; // Remove the node
        }

        if ( node.children ) {
            node.children = node.children.filter( child => child.id !== targetNodeId );
            for ( let i = 0; i < node.children.length; i++ ) {
                node.children[i] = this.deleteNodeRecursive( node.children[i], targetNodeId );
            }
        }

        return node;
    }

    toggleNode( nodeId ) {
        const node = findNodeById( this.state, nodeId );
        if ( node && node.fileType === FileTypes.FOLDER_TYPE ) {
            node.expanded = !node.expanded;
        }
    }

    toggleNodesExpandStatus( parent, expandStatus ) {
        parent.expanded = expandStatus;
        if ( parent.children ) {
            for ( const child of parent.children ) {
                this.toggleNodesExpandStatus( child, expandStatus )
            }
        }
    }

    expandNodesByParentPath( parent, parentPath ) {
        if ( parentPath.includes( parent.id ) ) {
            parent.expanded = ExpandStatus.EXPAND;
        } else {
            parent.expanded = ExpandStatus.COLLAPSE;
        }
        if ( parent.children ) {
            for ( const child of parent.children ) {
                this.expandNodesByParentPath( child, parentPath )
            }
        }
    }
}

// Store Creation
const fileExplorerStore = new FileExplorerStore();

export default fileExplorerStore;