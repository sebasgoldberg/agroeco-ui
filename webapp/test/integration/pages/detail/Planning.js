sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "detail.Planning";
	Opa5.createPageObjects({
		onThePlanningPage: {
			baseClass : Common,

			actions: {

			},

			assertions: {

				iShouldSeeThePlanningTable: function () {
					return this.waitFor({
						id: "resolutionsTable",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Planning Table is displayed");
						},
						errorMessage: "Did not find the Planning Table"
					});
				},

			}
		}
	});

});