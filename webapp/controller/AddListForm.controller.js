sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddListForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("addList").attachPatternMatched(this._onAddListMatched, this);
				
		},

		_onAddListMatched: function(){

			var oModel = new JSONModel({
				list: {
					name: "",
				},
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})

		},

		onAdd: function(){
			this.setBusy(true);
			name = this.getView().getModel('form').getProperty('/list/name');
			this.post('lists/', {'name': name })
				.then( data => {
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("ListChannel", "onListAdded", data['id']);	
					this.getRouter().navTo('detail', {listId: data['id']});
				})
				.catch( reason => console.error(reason) )
				.then( () => this.setBusy(false) );
		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});