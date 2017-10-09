sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "AddItemForm";
	Opa5.createPageObjects({
		onTheAddItemFormPage: {
			baseClass : Common,

			actions: {

				iPressTheCancelButton: function(){
					return this.waitFor({
						id: "cancelButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Cancel Button does not have a trigger."
					});
				},

				iPressTheNavButton: function(){
					return this.waitFor({
						id: "addItemFormPage",
						viewName: sViewName,
						success: function(oPage){
							oPage.$("navButton").trigger("tap");
						},
						errorMessage: "The Navigation Button was not found on rhe Add Item Form Page."
					});
				},
		
			},

			assertions: {

				iShouldSeeTheAddItemFormPage: function(){
					return this.waitFor({
						id: "addItemFormPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Add Item Form Page is displayed");
						},
						errorMessage: "Did not find the Add Item Form Page"
					});					
				},

			}

		}
	});

});