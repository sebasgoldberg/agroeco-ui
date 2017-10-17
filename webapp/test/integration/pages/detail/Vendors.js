sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "detail.Vendors";
	Opa5.createPageObjects({
		onTheVendorsPage: {
			baseClass : Common,

			actions: {

			},

			assertions: {

				iShouldSeeTheVendorsTable: function () {
					return this.waitFor({
						id: "vendorsTable",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Vendors Table is displayed");
						},
						errorMessage: "Did not find the Vendors Table"
					});
				},

			}
		}
	});

});