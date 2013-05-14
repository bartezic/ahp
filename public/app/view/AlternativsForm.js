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

Ext.define('AHP.view.AlternativsForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.alternativsform',
    renderTo: Ext.getBody(),
    frame: true,
    id: 'AlternativsForm',
    bodyPadding: 5,    
    buttons: [{ 
        text: 'Додати альтернативу',
        },{ 
        text: 'Зберегти та продовжити',
        formBind: true,
        disabled: true,            
    }]
});
  