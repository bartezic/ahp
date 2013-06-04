Ext.define('AHP.view.GoalForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.goalform',
  renderTo: Ext.getBody(),
  frame: true,
  id: 'GoalForm',
  bodyPadding: 5,    
  items:[{
    xtype: 'textfield',
    name: 'name',
    flex: 1,
    width: 170,
    allowBlank: false  
  }],
  buttons: [{ 
    text: 'Зберегти та продовжити >>',
    formBind: true,
    disabled: true,            
  }]
});
  