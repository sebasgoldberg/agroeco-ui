sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "Detail";
	Opa5.createPageObjects({
		onTheDetailPage: {
			baseClass : Common,

			actions: {

			},

			assertions: {

				iShouldSeeTheDetailPage: function () {
					return this.waitFor({
						id: "detailPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Detail Page is displayed");
						},
						errorMessage: "Did not find the Detail Page"
					});
				},

			}
		}
	});

});