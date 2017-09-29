sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Items", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("items").attachMatched(this._onItemsMatched, this);

		},

		_onItemsMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			// this.loadAndBindModel(
			// 	'product_uom/?expand=product,uom',
			// 	'products');

			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&expand=product_uom.product,product_uom.uom`);
	

			// this.loadAndBindModel(`lists/${listId}/`);
			// this.getRouter().getTargets().display("items");
		},

		// getAddItemDialog: function(){
		// 	if (!this._addItemDialog){
		// 		var oView = this.getView();
		// 		this._addItemDialog = sap.ui.xmlfragment(
		// 			oView.getId(), 
		// 			"iamsoft.agroeco.view.dialog.ItemDialog",
		// 			this);
		// 		oView.addDependent(this._addItemDialog);
		// 	}
		// 	return this._addItemDialog
		// },

		onOpenAddItemDialog: function(){
			this.getRouter().navTo("addItem", {listId: this._listId});
			// var dialog = this.getAddItemDialog();
			// dialog.open();
		},

		// onAddItem: function(){
		// 	this.getAddItemDialog().close();
		// },

		// onCloseDialog: function(){
		// 	this.getAddItemDialog().close();
		// }
	});
});