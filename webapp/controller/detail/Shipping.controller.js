sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Shipping", {

		formatter: formatter,
		
		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("shipping").attachMatched(this._onShippingMatched, this);
			
		},

		_onShippingMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			this.refreshItems();
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`vendors-shipping-methods/?vendor__vproducts__resolutions__item__purchase_list=${this._listId}&expand=vendor&ordering=vendor`);
		},

	});
});