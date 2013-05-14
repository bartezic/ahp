Ext.Loader.setConfig({'enabled':true});

Ext.application({
    name: 'AHP',
    controllers: [
    	'AHPController'
    ],    
    launch: function() {
    	Ext.create('AHP.view.Viewport');
    }
});


