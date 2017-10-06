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
		Then.onTheAppPage.iShouldSeeTheAddListButton();
	});

	opaTest("Should be displayed the add list form.", function (Given, When, Then) {
		//Actions
		When.onTheAppPage.iPressTheAddListButton();
		// Assertions
		Then.onTheAppPage.iShouldSeeTheAddListForm().and.iShouldSeeTheListNameInput();

	});

	// opaTest("Should be created a new list.", function (Given, When, Then) {
	// 	//Actions
	// 	When.onTheAppPage.iEnterAListName().and.iPressTheAddListFormAddButton();
	// 	// Assertions
	// 	Then.onTheAppPage.iShouldSeeTheNewListInMaster()
	// 		.and.iShouldSeeTheNewListInDetail();

	// });

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});

	opaTest("Should see the add list page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheApp({
			hash:"/lists/add"
		});

		//Actions
		When.onTheAppPage.iLookAtTheScreen();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp()
			.and.iShouldSeeTheAddListForm()
			.and.iShouldNotSeeTheListsDetail();
	});

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});


});