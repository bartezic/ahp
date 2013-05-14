Ext.define('AHP.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'border',
    padding: '5',
    items: [{
        region: 'north',
        height: 28,
        style: 'margin-bottom:5px',
        xtype: 'logintoolbar'
    },{
        region: 'center',
        title: 'About AHP',
	    xtype : 'panel',
	    html: 'AHP'
    },{
        xtype:'toolbar',
        height: 28,
        style: 'margin-top:5px; padding-top:5px; ',
        html: '<div align="center">&copy; 2011-2013 Oleksyn Viktor</div>',
        region:'south'
    }]
});	

