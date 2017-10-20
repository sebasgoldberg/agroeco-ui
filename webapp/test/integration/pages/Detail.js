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

				iPressTheAddItemButton: function(){
					return this.waitFor({
						id: "addItemButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Add Item Button does not have a trigger."
					});
				},

				iPressTheItemsTab: function(){
					return this.waitFor({
						id: "itemsTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Items Tab does not have a trigger."
					});
				},

				iPressThePlanningTab: function(){
					return this.waitFor({
						id: "planningTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Planning Tab does not have a trigger."
					});
				},

				iPressTheShippingTab: function(){
					return this.waitFor({
						id: "shippingTab",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Shipping Tab does not have a trigger."
					});
				},

				iPressTheBackButton: function(){
					return Opa5.getWindow().history.back();
				},

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