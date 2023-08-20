// fileExplorerView.js

import actions from '../actions/actions.js';
import { FileTypes } from '../common/commonConstants.js';
import { createIcon, createNodeElement } from '../common/domOperations.js';

class FileExplorerView {
    constructor( store, elementId ) {
        this.store = store;
        this.element = document.getElementById( elementId );
        this.store.addChangeListener( () => {
            console.log( 'Tree Rendered' );
            this.render()
        } );
    }

    render() {
        this.element.innerHTML = ''; // Clear existing content

        function renderNodes( parentNode, parentElement ) {
            const currentElement = createNodeElement( parentNode );
            parentElement.appendChild( currentElement );

            if ( parentNode.expanded && parentNode.children && parentNode.children.length > 0 ) {
                const childrenContainer = document.createElement( 'div' );
                childrenContainer.className = 'children-container';

                for ( const child of parentNode.children ) {
                    renderNodes( child, childrenContainer );
                }

                currentElement.appendChild( childrenContainer );
            }
        }

        renderNodes( this.store.getState(), this.element );
    }
}

export default FileExplorerView;