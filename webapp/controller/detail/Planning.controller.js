sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Planning", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'resolutions/?limit=20&offset=50&expand=item.product_uom.product,item.product_uom.uom,vendor_product.vendor',
				undefined,
				'/results/');

		},

	});
});