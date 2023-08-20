import actions from "../actions/actions";
import { FileTypes } from "./commonConstants";

export const createIcon = ( iconClass, tooltipText ) => {
    const toolTip = document.createElement( 'span' );
    toolTip.className = 'tooltiptext';
    const toolTipTextNode = document.createTextNode( tooltipText );
    toolTip.appendChild( toolTipTextNode );

    const icon = document.createElement( 'i' );
    icon.classList.add( 'tooltip' );
    iconClass.split( ' ' ).forEach( ( iClass ) => {
        icon.classList.add( iClass );

    } );
    icon.appendChild( toolTip );
    return icon;
};

export const createNodeElement = ( node ) => {
    // Its a Sequential Render, do not change elements append Order
    const nodeElement = document.createElement( 'div' );
    nodeElement.className = 'node';
    nodeElement.id = node.id;

    // Expand Collapse Button
    if ( node.fileType === FileTypes.FOLDER_TYPE ) {
        const expandButton = document.createElement( 'button' );
        expandButton.className = 'fa-icon';
        expandButton.innerHTML = node.expanded ? `<i class='fa fa-chevron-down'></i>` : `<i class='fa fa-chevron-right'></i>`;
        expandButton.addEventListener( 'click', () => actions.toggleItem( node.id ) );
        nodeElement.appendChild( expandButton );
    } else {
        const circleButton = document.createElement( 'button' );
        circleButton.className = 'fa-icon fa-icon-red';
        const circleIcon = createIcon( 'fa fa-circle', 'File' );
        circleButton.appendChild( circleIcon );
        nodeElement.appendChild( circleButton );
    }

    // Label 
    const label = document.createElement( 'span' );
    label.className = 'node-label';
    label.textContent = `${node.label}`;
    nodeElement.appendChild( label );

    // Add File and Add Folder Button
    if ( node.fileType === FileTypes.FOLDER_TYPE ) {
        // Buttons
        const addFileButton = document.createElement( 'button' );
        addFileButton.className = 'fa-icon addFileBtn';
        const addFileIcon = createIcon( 'fa fa-file', 'Add File' );
        addFileButton.appendChild( addFileIcon );
        addFileButton.addEventListener( 'click', () => actions.addItem( node.id, FileTypes.FILE_TYPE ) );

        const addFolderButton = document.createElement( 'button' );
        addFolderButton.className = 'fa-icon addFolderBtn';
        const addFolderIcon = createIcon( 'fa fa-folder', 'Add Folder' );
        addFolderButton.appendChild( addFolderIcon );
        addFolderButton.addEventListener( 'click', () => actions.addItem( node.id, FileTypes.FOLDER_TYPE ) );

        nodeElement.appendChild( addFileButton );
        nodeElement.appendChild( addFolderButton );
    }

    // Delete Button
    const deleteButton = document.createElement( 'button' );
    deleteButton.className = 'fa-icon deleteBtn';
    const deleteIcon = createIcon( 'fa fa-trash', 'Delete' );
    deleteButton.appendChild( deleteIcon );
    deleteButton.addEventListener( 'click', () => actions.deleteItem( node.id ) );
    nodeElement.appendChild( deleteButton );

    // Return New Node
    return nodeElement;
}