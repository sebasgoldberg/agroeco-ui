sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "App";
	Opa5.createPageObjects({
		onTheAppPage: {
			baseClass : Common,

			actions: {

				iPressTheAddListButton: function(){
					return this.waitFor({
						id: "addListButton",
						viewName: "Master",
						actions: new Press(),
						errorMessage: "The Add List Button does not have a trigger."
					});
				},

			},

			assertions: {

				iShouldSeeTheApp: function () {
					return this.waitFor({
						id: "app",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The App view is displayed");
						},
						errorMessage: "Did not find the App view"
					});
				},

				iShouldSeeTheAddListButton: function () {
					return this.waitFor({
						id: "addListButton",
						viewName: 'Master',
						success: function () {
							Opa5.assert.ok(true, "The Add List Button is displayed");
						},
						errorMessage: "Did not find the Add List Button"
					});
				},

				iShouldSeeTheAddListForm: function(){
					return this.waitFor({
						id: "addListForm",
						viewName: 'AddListForm',
						success: function () {
							Opa5.assert.ok(true, "The Add List Form is displayed");
						},
						errorMessage: "Did not find the Add List Form"
					});					
				},

				iShouldSeeTheListNameInput: function(){
					return this.waitFor({
						id: "listNameInput",
						viewName: 'AddListForm',
						success: function () {
							Opa5.assert.ok(true, "The List Name Input is displayed");
						},
						errorMessage: "Did not find the List Name Input",
					});					
				},

				iShouldNotSeeTheListsDetail: function(){
					var timesChecked = 0;
					return this.waitFor({
						id: "addListForm",
						viewName: 'AddListForm',
						pollingInterval: 1000,
						timeout: 7,
						check: function(){
							timesChecked++;
							if (timesChecked >= 5){
								return true;
							}
							return false;
						},
						success: function () {
							Opa5.assert.ok(true, "I Should not see the list detail.");
						},
					});
				},

				allLooksOK: function(){
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true);
						},
					});
				}

			}
		}
	});

});