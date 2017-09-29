sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddItemForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'product_uom/?expand=product,uom',
				'products');

			this.getRouter().getRoute("addItem").attachPatternMatched(this._onAddItemMatched, this);
				
		},

		_onAddItemMatched: function(oEvent){
			var listId =  oEvent.getParameter("arguments").listId;			
			var oModel = new JSONModel({
				purchase_list: listId,
				product_uom: "",
				quantity: "",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})
		},

		onAdd: function(){
			var data = this.getModel('form').getData();
			this.post('items/', JSON.stringify(data)).then(
				function(data){
					this.getRouter().navTo('items', {listId: data['purchase_list']});
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