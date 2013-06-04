Ext.Loader.setConfig({'enabled':true});

Ext.application({
    name: 'AHP',
    appFolder: '/old/app',
    controllers: [
    	'AHPController'
    ],    
    launch: function() {
    	Ext.create('AHP.view.Viewport');
    }
});


