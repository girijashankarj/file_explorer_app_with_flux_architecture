// headerView.js
import actions from '../actions/actions.js';
import { ExpandStatus } from '../common/commonConstants.js';
import { createIcon } from '../common/domOperations.js';

class HeaderView {
    constructor( elementId ) {
        this.element = document.getElementById( elementId );
    }

    render() {
        // Title Section
        const titleElement = document.createElement( 'span' );
        titleElement.id = 'title-container';
        // Title Icon
        const iconElement = document.createElement( 'i' );
        iconElement.classList.add( 'fa', 'fa-folder-open' );
        // Title Text
        const titleTextElement = document.createElement( 'span' );
        const textNode = document.createTextNode( ' File Explorer' );
        titleTextElement.append( textNode );
        // Append 
        titleElement.appendChild( iconElement );
        titleElement.appendChild( titleTextElement );
        this.element.appendChild( titleElement );

        // Expand All 
        const expanAllButton = document.createElement( 'button' );
        expanAllButton.id = 'expanAllButton';
        expanAllButton.classList.add( 'fa-icon' );
        expanAllButton.classList.add( 'fa-icon-black' );

        const expanAllIcon = createIcon( 'fa fa-expand', 'Expand All' );
        expanAllButton.appendChild( expanAllIcon );
        expanAllButton.addEventListener( 'click', () => {
            actions.toggleNodesExpandStatus( ExpandStatus.EXPAND );
        } );

        // Collapse All
        const collapseAllButton = document.createElement( 'button' );
        collapseAllButton.id = 'collapseAllButton';
        collapseAllButton.classList.add( 'fa-icon' );
        collapseAllButton.classList.add( 'fa-icon-black' );

        const collapseAllIcon = createIcon( 'fa fa-compress', 'Collapse All' );
        collapseAllButton.appendChild( collapseAllIcon );
        collapseAllButton.addEventListener( 'click', () => {
            actions.toggleNodesExpandStatus( ExpandStatus.COLLAPSE );
        } );

        // Append
        const operationSection = document.createElement( 'span' );
        operationSection.id = 'operationSection';
        operationSection.appendChild( expanAllButton );
        operationSection.appendChild( collapseAllButton );
        this.element.appendChild( operationSection );

        // Search Section
        const searchContainer = document.createElement( 'span' );
        searchContainer.id = 'search-container';

        // Input
        const searchInput = document.createElement( 'input' );
        searchInput.type = 'text';
        searchInput.id = 'searchInput';
        searchInput.placeholder = 'Search files...';
        searchInput.addEventListener( 'keydown', ( event ) => {
            if ( event.key === 'Enter' ) {
                actions.searchItem( searchInput.value );
            }
        } );

        // Clear 
        const clearButton = document.createElement( 'button' );
        clearButton.id = 'clearButton';
        clearButton.classList.add( 'fa-icon' );
        clearButton.classList.add( 'fa-icon-black' );

        const clearIcon = document.createElement( 'i' );
        clearIcon.className = 'fa fa-times';
        clearButton.appendChild( clearIcon );
        clearButton.addEventListener( 'click', () => {
            searchInput.value = '';
            actions.toggleNodesExpandStatus( ExpandStatus.EXPAND );
        } );

        // Search
        const searchButton = document.createElement( 'button' );
        searchButton.id = 'searchButton';
        searchButton.classList.add( 'fa-icon' );
        searchButton.classList.add( 'fa-icon-black' );

        const searchIcon = document.createElement( 'i' );
        searchIcon.className = 'fa fa-search';
        searchButton.appendChild( searchIcon );
        searchButton.addEventListener( 'click', () => actions.searchItem( searchInput.value ) );

        // Append
        searchContainer.appendChild( searchInput );
        searchContainer.appendChild( clearButton );
        searchContainer.appendChild( searchButton );

        this.element.appendChild( searchContainer );
    }
}

export default HeaderView;