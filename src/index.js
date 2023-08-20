// index.js

import fileExplorerStore from './stores/store.js';
import './styles/index.css';
import FileExplorerView from './views/fileExplorerView.js';
import Footerview from './views/footerView.js';
import HeaderView from './views/headerView.js';

// Controller for Initial rendering
( () => {
    // View Instances
    const headerView = new HeaderView( 'mainHeader' );
    const fileExplorerView = new FileExplorerView( fileExplorerStore, 'fileExplorer' );
    const footerView = new Footerview( 'mainFooter' );

    // Render View 
    headerView.render();
    fileExplorerView.render();
    footerView.render();
} )();