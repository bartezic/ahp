Ext.define('AHP.view.LoginToolBar',{
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.logintoolbar',
        autoScroll:true,
	
	initComponent:function(){
		this.items = [/*{
				text:'Login',
				iconCls:'icnLogin'	
			},{
				text:'Register',
				iconCls:'icnRegister'
			},*/{
				text:'Метод AHP',
				//iconCls:'icnCriterias'
			}];
		this.callParent();
	}
});