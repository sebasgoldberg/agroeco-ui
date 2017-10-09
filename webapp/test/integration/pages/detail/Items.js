sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "detail.Items";
	Opa5.createPageObjects({
		onTheItemsPage: {
			baseClass : Common,

			actions: {

				iPressTheAddItemButton: function(){
					return this.waitFor({
						id: "addItemButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Add Item Button does not have a trigger."
					});
				},

			},

			assertions: {

				iShouldSeeTheItemsTable: function () {
					return this.waitFor({
						id: "itemsTable",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Items Table is displayed");
						},
						errorMessage: "Did not find the Items Table"
					});
				},

			}
		}
	});

});