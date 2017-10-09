sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "detail.Shipping";
	Opa5.createPageObjects({
		onTheShippingPage: {
			baseClass : Common,

			actions: {

			},

			assertions: {

				iShouldSeeTheShippingTable: function () {
					return this.waitFor({
						id: "shippingTable",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Shipping Table is displayed");
						},
						errorMessage: "Did not find the Shipping Table"
					});
				},

			}
		}
	});

});