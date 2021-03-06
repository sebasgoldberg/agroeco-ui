sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "AddListForm";
	Opa5.createPageObjects({
		onTheAddListFormPage: {
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
						id: "addListFormPage",
						viewName: sViewName,
						success: function(oPage){
							oPage.$("navButton").trigger("tap");
						},
						errorMessage: "The Navigation Button was not found on rhe Add List Form Page."
					});
				},
		
			},

			assertions: {

				iShouldSeeTheAddListFormPage: function(){
					return this.waitFor({
						id: "addListFormPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Add List Form Page is displayed");
						},
						errorMessage: "Did not find the Add List Form Page"
					});					
				},

				iShouldSeeTheAddListForm: function(){
					return this.waitFor({
						id: "addListForm",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Add List Form is displayed");
						},
						errorMessage: "Did not find the Add List Form"
					});					
				},

				iShouldSeeTheListNameInput: function(){
					return this.waitFor({
						id: "listNameInput",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The List Name Input is displayed");
						},
						errorMessage: "Did not find the List Name Input",
					});					
				},

			}
		}
	});

});