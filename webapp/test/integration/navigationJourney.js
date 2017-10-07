/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheApp();

		//Actions
		When.onTheAppPage.iLookAtTheScreen();
		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

	});

	opaTest("Should see the add list button on the master page", function (Given, When, Then) {
		//Actions
		When.onTheAppPage.iLookAtTheScreen();
		// Assertions
		Then.onTheMasterPage.iShouldSeeTheAddListButton();
	});

	opaTest("Should be displayed the add list form.", function (Given, When, Then) {
		//Actions
		When.onTheMasterPage.iPressTheAddListButton();
		// Assertions
		Then.onTheAddListFormPage.iShouldSeeTheAddListForm().and.iShouldSeeTheListNameInput();

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