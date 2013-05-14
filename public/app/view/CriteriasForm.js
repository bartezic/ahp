var criterias = Ext.create('Ext.data.Store', {
    fields: ['val', 'name'],
    data : [
        {"val":"1", "name":"1"},
        {"val":"3", "name":"3"},
        {"val":"5", "name":"5"},
        {"val":"7", "name":"7"},
        {"val":"9", "name":"9"}
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
        text: 'Додати критерію',
        },{ 
        text: 'Зберегти та продовжити',
        formBind: true,
        disabled: true,            
    }]
});
  