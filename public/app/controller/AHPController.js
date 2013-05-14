Ext.define('AHP.controller.AHPController', {
	extend : 'Ext.app.Controller',

	models : ['RegistrationForm'],
	views : [
            'LoginToolBar', 
            'CriteriasForm',
            'AlternativsForm',
            'ResultForm'
        ],	

	init : function() {
		this.control({
			/*'Viewport' : {
				render : this.doCriteriasButtonClick()
			},*/
			'logintoolbar button[text=Метод AHP]' : {
				click : this.doCriteriasButtonClick
			},
            'criteriasform button[text=Додати критерію]' : {
				click : this.doAddCriteriaButtonClick
			},
			'criteriasform button[text=Зберегти та продовжити]' : {
				click : this.doSubmitCriteriasButtonClick
			},
			'alternativsform button[text=Додати альтернативу]' : {
				click : this.doAddAlternativButtonClick
			},
			'alternativsform button[text=Зберегти та продовжити]' : {
				click : this.doSubmitAlternativsButtonClick
			},
		});
	},
	
	doCriteriasButtonClick : function() {
		var c = Ext.create('Ext.Window', {
			title : 'Форма вибору критерій',
			id: 'WindowForCriteriasForm',
			width : 400,
			renderTo: Ext.getBody(),
			resizable : true,
			modal : true,
			border : true,
			bodyPadding : 10,
			items : [{
				xtype : 'criteriasform'
			}]
		});
		c.show();
		this.doAddCriteriaButtonClick();
	},

	doAddCriteriaButtonClick : function() {
		var a = Ext.create('Ext.container.Container', {
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                //fieldLabel: 'Name',
                name: 'name',
                flex: 1,
                allowBlank: false                       
            },{
	            editable: false,
	            store: criterias,
	            queryMode: 'local',
	            displayField: 'name',
	            valueField: 'val',
	            xtype: 'combo',
	            //fieldLabel: 'Priority',
	            name: 'priority',
	            margins: '0 8 0 8',
	            flex: 1,
	            allowBlank: false
        }],
            
        });
		var CriteriasForm = Ext.getCmp('CriteriasForm');
        CriteriasForm.add( a );
        CriteriasForm.doLayout();
	},

	doSubmitCriteriasButtonClick : function() {
		CriteriasValuesArray = Ext.getCmp('CriteriasForm').getValues();
		CriteriasValuesArray.result = this.calculationFeatures(CriteriasValuesArray.priority);
		var m = CriteriasValuesArray;
		console.log(m);
		Ext.getCmp('WindowForCriteriasForm').close();
		
		Ext.create('Ext.Window', {
			title : 'Форма вибору альтернатив',
			id: 'WindowForAlternativForm',
			width: 600,
			renderTo: Ext.getBody(),
			resizable : true,
			modal : true,
			border : true,
			bodyPadding : 10,
			items: [{ 
				xtype:'alternativsform',  
		    }]
		}).show();

		var c = Ext.getCmp('AlternativsForm');

		var a = Ext.create('Ext.container.Container', {
            layout: 'hbox',
        });
        a.add( Ext.create('Ext.form.Label', 
        		{ 
	        		margins: '0 10 0 10', 
	        		text: 'Ім\'я альтернативи:',
	        		flex: 1
	        	}) 
	        );
        var i;
        for(i=0;i<m.name.length;i++){
			a.add( Ext.create('Ext.form.Label', 
					{ 
						margins: '0 10 0 10', 
						text: m.name[i]/*+'('+m.result[i].toFixed(3)+')*/+'(вага):',
						flex: 1 
					}) 
				);
		};

		c.add( a );
		this.doAddAlternativButtonClick();
	},

	doAddAlternativButtonClick : function(){
		var m = CriteriasValuesArray;
		var c = Ext.getCmp('AlternativsForm');
		var b = Ext.create('Ext.container.Container', {
            layout: 'hbox',
        });
        b.add( Ext.create('Ext.form.field.Text', 
        			{ 
	        			margins: '0 10 0 10',         
	        			name: 'name',
                		flex: 1,
                		allowBlank: false    
                	}) 
        );
        for(var i=0;i<m.name.length;i++){
			b.add( Ext.create('Ext.form.field.ComboBox', 
						{ 
							margins: '0 10 0 10', 
	        				name: m.name[i],
                			editable: false,
				            store: criterias,
				            queryMode: 'local',
				            displayField: 'name',
				            valueField: 'val',
				            flex: 1,
				            allowBlank: false
						}) 
					);
		}
		c.add( b );
	},

	doSubmitAlternativsButtonClick : function() {
		AlternativsValuesObj = Ext.getCmp('AlternativsForm').getValues();
		var m = AlternativsValuesObj;
		console.log(m);
		var AlternativsValuesObjResult = new Object();
		for(prop in AlternativsValuesObj){
			if(prop=='name'){
				AlternativsValuesObjResult[prop] = m[prop];
			}
			else{
				AlternativsValuesObjResult[prop] = this.calculationFeatures(m[prop]);
			}
		}
		console.log(AlternativsValuesObjResult);
		var result = this.calculationResults(AlternativsValuesObjResult);
		console.log(result);
		Ext.getCmp('WindowForAlternativForm').close();
		
		Ext.create('Ext.Window', {
			title : 'Результати:',
			renderTo: Ext.getBody(),
			id: 'WindowForResultForm',
			width: 700,
			modal : true,
			border : true,
			bodyPadding : 10,
			items: [{ 
				xtype:'resultform',  
		    }]
		}).show();
		
		var c = Ext.getCmp('ResultForm');
		
		var store = Ext.create('Ext.data.JsonStore', {
		    fields: ['name', 'data1'],
		    data: result
		});
		var donut = false,
	        panel1 = Ext.create('Ext.chart.Chart', {
	        width: 600,
	        height: 400,
            id: 'chartCmp',
            animate: true,
            store: store,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                donut: donut,
                tips: {
                  trackMouse: true,
                  width: 100,
                  height: 28,
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    store.each(function(rec) {
                        total += rec.get('data1');
                    });
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                  }
                },
                highlight: {
                  segment: {
                    margin: 20
                  }
                },
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
	    });
		c.add( panel1);

		var a = Ext.create('Ext.container.Container', {
            layout: 'hbox',
        });
        a.add( Ext.create('Ext.form.Label', 
        		{ 
	        		margins: '0 10 0 10', 
	        		text: 'Ім\'я альтернативи:',
	        		flex: 1
	        	}) 
	        );
        var i;
        store.each(function(rec) {
	    	a.add( Ext.create('Ext.form.Label', 
					{ 
						margins: '0 10 0 10', 
						text: rec.get('name'),
						flex: 1 
					}) 
				);
        });
		c.add( a );

		var b = Ext.create('Ext.container.Container', {
            layout: 'hbox',
        });
        b.add( Ext.create('Ext.form.Label', 
        		{ 
	        		margins: '10 10 10 10', 
	        		text: 'Результат:',
	        		flex: 1
	        	}) 
	        );
	    store.each(function(rec) {
	    	b.add( Ext.create('Ext.form.Label', 
					{ 
						margins: '10 10 10 10', 
						text: rec.get('data1').toFixed(3),
						flex: 1 
					}) 
				);
        });
		c.add( b );
	},
	calculationFeatures: function(m){
		var arrayForPrioritCalc = new Array(m.length);
		for(var row=0; row<m.length; row++){
			arrayForPrioritCalc[row] = new Array(m.length);
			for(var col=0; col<m.length; col++){
				arrayForPrioritCalc[row][col] = m[col]/m[row];
			}	
		}
		var prioritCalc = new Array(arrayForPrioritCalc[0].length);
		for(var row=0; row<arrayForPrioritCalc[0].length; row++){
			prioritCalc[row]=0;
			for(var col=0; col<arrayForPrioritCalc[0].length; col++){
				prioritCalc[row] += arrayForPrioritCalc[col][row];
			}	
		} 
		var prioritCalcTotal = 0;
		for(var i=0; i<prioritCalc.length; i++){
			prioritCalcTotal += prioritCalc[i];
		}
		for(var i=0; i<prioritCalc.length; i++){
			prioritCalc[i] /= prioritCalcTotal;
		}
		/*console.log(prioritCalc);
		for(var row=0; row<arrayForPrioritCalc[0].length; row++){
			for(var col=0; col<arrayForPrioritCalc[0].length; col++){
				arrayForPrioritCalc[row][col] /= prioritCalc[col];
			}	
		}*/
		return prioritCalc;
	},
	calculationResults: function(m){
		var arrayForResults = new Array();
		var arrayForRes = new Array();
		for(var i=0;i<m.name.length;i++){
			console.log(m.name[i]);
			arrayForResults[i] = 0;
			for(prop in m){
				if(prop!='name'){
					arrayForResults[i] +=m[prop][i]*CriteriasValuesArray.result[CriteriasValuesArray.name.indexOf(prop)];
				}
			}
			arrayForRes.push({name: m.name[i], data1:arrayForResults[i]});
		}
		return arrayForRes;
	}

});
