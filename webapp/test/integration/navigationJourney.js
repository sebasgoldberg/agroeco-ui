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

	opaTest("When add list cancel button is pressed, should navigate to master and display the details of the first list.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAppPage.iPressTheAddListCancelButton();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheMaster()
			.and.iShouldSeeTheFirstListsDetails();
	});

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});


});