sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Planning", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'resolutions/?limit=10&expand=item.product_uom.product,item.product_uom.uom',
				undefined,
				'/results/');

		},

	});
});