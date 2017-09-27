sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Orders", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();
			
		},

	});
});