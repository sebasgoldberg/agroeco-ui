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

			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&expand=product_uom.product,product_uom.uom`);
		},

		onAddItem: function(){
			this.getRouter().navTo("addItem", {listId: this._listId});
		},

	});
});