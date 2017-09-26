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
			
		},

		getAddItemDialog: function(){
			if (!this._addItemDialog){
				var oView = this.getView();
				this._addItemDialog = sap.ui.xmlfragment(oView.getId(), "iamsoft.agroeco.view.dialog.ItemDialog");
				oView.addDependent(this._addItemDialog);
			}
			return this._addItemDialog
		},

		onOpenAddItemDialog: function(){
			var dialog = this.getAddItemDialog();
			dialog.open();
		},

		onCloseDialog: function(){
			this.getAddItemDialog().close();
		}
	});
});