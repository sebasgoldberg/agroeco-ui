sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Planning", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("planning").attachMatched(this._onItemsMatched, this);

		},

		_onItemsMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			this.loadAndBindModel(
				`resolutions/?item__purchase_list=${this._listId}&expand=vendor_product.vendor,vendor_product.product_uom.uom`);
		},

		onAddItem: function(){
			this.getRouter().navTo("addResolution", {listId: this._listId});
		},

	});
});