/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Uri Journey");

	opaTest("Should see the add list page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheApp({
			hash:"/lists/add"
		});

		//Actions
		When.onTheAppPage.iLookAtTheScreen();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();
		Then.onTheAddListFormPage.iShouldSeeTheAddListForm();

	});

	opaTest("When I wait some seconds, I should see the add list page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iWaitSomeSeconds(5);

		//Actions
		When.onTheAppPage.iLookAtTheScreen();

		// Assertions
		Then.onTheAddListFormPage.iShouldSeeTheAddListForm();
	});

	opaTest("When add list cancel button is pressed, should navigate to master and display the details of the first list.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAddListFormPage.iPressTheCancelButton();

		// Assertions
		Then.onTheMasterPage.iShouldSeeTheMasterPage();
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
	});

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});


});