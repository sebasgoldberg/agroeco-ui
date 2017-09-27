sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Items", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'product_uom/?expand=product,uom',
				'products');

			this.loadAndBindModel(
				'items/?limit=10&expand=product_uom.product,product_uom.uom',
				undefined,
				'/results/');
	
		},

		getAddItemDialog: function(){
			if (!this._addItemDialog){
				var oView = this.getView();
				this._addItemDialog = sap.ui.xmlfragment(
					oView.getId(), 
					"iamsoft.agroeco.view.dialog.ItemDialog",
					this);
				oView.addDependent(this._addItemDialog);
			}
			return this._addItemDialog
		},

		onOpenAddItemDialog: function(){
			var dialog = this.getAddItemDialog();
			dialog.open();
		},

		onAddItem: function(){
			this.getAddItemDialog().close();
		},

		onCloseDialog: function(){
			this.getAddItemDialog().close();
		}
	});
});