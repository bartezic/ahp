Ext.define('AHP.model.RegistrationForm', {
    extend: 'Ext.data.Model',
    
    fields: ['login', 'fullname','email','password','password_confirmation'],
    
    validations: [
        {type: 'format', name: 'login', matcher: /^[a-zA-Z0-9]+$/ },
        {type: 'format',   name: 'fullname', matcher: /^[a-zA-Z]+([\s][a-zA-Z]+)*$/ },
    ],
    
	proxy: {		
		type: 'ajax',
	    api: {
	        create: '../../registration'
	    },
	    
	    writer: {
	        type: 'json',
	        root: 'user',
	        successProperty: 'success'
	    }
	}
});