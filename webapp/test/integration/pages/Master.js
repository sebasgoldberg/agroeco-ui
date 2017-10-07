sap.ui.define([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	'sap/ui/test/actions/Press',
], function(Opa5, Common, Press) {
	"use strict";
	var sViewName = "Master";
	Opa5.createPageObjects({
		onTheMasterPage: {
			baseClass : Common,

			actions: {

				iPressTheAddListButton: function(){
					return this.waitFor({
						id: "addListButton",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The Add List Button does not have a trigger."
					});
				},

			},

			assertions: {

				iShouldSeeTheMasterPage: function () {
					return this.waitFor({
						id: "masterPage",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Master Page is displayed");
						},
						errorMessage: "Did not find the Master Page"
					});
				},

				iShouldSeeTheAddListButton: function () {
					return this.waitFor({
						id: "addListButton",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The Add List Button is displayed");
						},
						errorMessage: "Did not find the Add List Button"
					});
				},

			}
		}
	});

});