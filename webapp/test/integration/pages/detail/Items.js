sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "Items";
	Opa5.createPageObjects({
		onTheDetailPage: {
			baseClass : Common,

			actions: {

			},

			assertions: {

				iShouldSeeTheItemsPage: function () {
					return this.waitFor({
						id: "itemsPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Items Page is displayed");
						},
						errorMessage: "Did not find the Items Page"
					});
				},

			}
		}
	});

});