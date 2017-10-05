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
			name = this.getView().getModel('form').getProperty('/list/name');
			this.post('lists/', JSON.stringify({'name': name })).then(
				function(data){
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("ListChannel", "onListAdded", data['id']);	
					this.getRouter().navTo('items', {listId: data['id']});
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this)
			);
		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});