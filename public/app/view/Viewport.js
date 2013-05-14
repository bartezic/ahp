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
        html: '<p align="center"><i>&copy; 2011, Oleksyn Viktor</i></p>',
        region:'south'
    }]
});	

