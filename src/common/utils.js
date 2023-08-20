// utils.js

import { ExpandStatus, FileTypes } from "./commonConstants";

export const createNewItem = ( itemName, fileType ) => {
    // Implement your createNewItem logic based on your provided code
    const newItem = {
        id: Math.random().toString( 36 ).substr( 2, 9 ),
        label: capitalizeFirstLetter( itemName ),
        fileType: fileType,
        expanded: fileType == FileTypes.FOLDER_TYPE ? ExpandStatus.EXPAND : null,
        children: fileType == FileTypes.FOLDER_TYPE ? [] : null,
    };
    return newItem;
}

export const findNodeById = ( parent, nodeId ) => {
    if ( parent.id === nodeId ) {
        return parent;
    } else if ( parent.children ) {
        for ( const child of parent.children ) {
            const foundNode = findNodeById( child, nodeId );
            if ( foundNode ) {
                return foundNode;
            }
        }
    }
    return null;
}

export const findNodeByLabel = ( parent, label ) => {
    if ( parent.label === label ) {
        return parent;
    } else if ( parent.children ) {
        for ( const child of parent.children ) {
            const foundNode = findNodeByLabel( child, label );
            if ( foundNode ) {
                return foundNode;
            }
        }
    }
    return null;
}

export const validateFileName = ( fileName = "", state ) => {
    // Implement your validateFileName logic based on your provided code
    const maxCharLimit = 50;

    // Check character limit
    if ( fileName.length < 0 || fileName.trim() == '' ) {
        return 'File name is empty.';
    }

    const checkFileName = fileName.trim();

    // Check character limit
    if ( checkFileName.length > maxCharLimit ) {
        return 'File name exceeds the maximum character limit of 50.';
    }

    // Check for special characters
    const specialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/;
    if ( specialChars.test( checkFileName ) ) {
        return 'File name contains special characters. Only alphanumeric characters are allowed.';
    }

    // Check for duplicates
    const allFileNames = Object.keys( state ).flatMap( folder => Object.keys( state[folder] ) );
    if ( findNodeByLabel( state, checkFileName ) ) {
        return 'File name is a duplicate and already exists.';
    }

    return null; // Validation successful
}

export const capitalizeFirstLetter = ( string ) => {
    return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

export const findParentPath = ( node, label ) => {
    if ( node.label === label ) {
        return [node.id];
    } else if ( node.children ) {
        return node.children.reduce( ( acc, childNode ) => {
            const path = findParentPath( childNode, label );
            if ( path ) {
                return path.concat( node.id );
            } else {
                return acc;
            }
        }, null );
    } else {
        return null;
    }
};