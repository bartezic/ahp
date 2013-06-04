var criterias = Ext.create('Ext.data.Store', {
  fields: ['val', 'name'],
  data : [
    {"val":1, "name":"1"},
    {"val":2, "name":"2"},
    {"val":3, "name":"3"},
    {"val":4, "name":"4"},
    {"val":5, "name":"5"},
    {"val":6, "name":"6"},
    {"val":7, "name":"7"},
    {"val":8, "name":"8"},
    {"val":9, "name":"9"}
  ]
});

Ext.define('AHP.view.CriteriasForm',{
  extend: 'Ext.form.Panel',
  alias: 'widget.criteriasform',
  frame: true,
  renderTo: Ext.getBody(),
  id: 'CriteriasForm',
  bodyPadding: 5,    
  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'label',
      text: 'Ім\'я критерії:',
      flex: 1                     
    },{
      xtype: 'label',
      text: 'Приорітет критерії(вага):',
      flex: 1
    }]
  }],
  buttons: [{
    text: '<< Назад',
  },{ 
    text: '+ Додати критерію',
  },{ 
    text: 'Зберегти та продовжити >>',
    formBind: true,
    disabled: true,            
  }]
});
  