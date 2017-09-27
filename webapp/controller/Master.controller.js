sap.ui.define([
    "iamsoft/agroeco/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'lists');
			
		},

	});
});