/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	/*
	Navigate between all the possible views:
	*/

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheApp();

		//Actions
		When.onTheAppPage.iLookAtTheScreen();
		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

	});

	/*
	App --> Master
	Master --[push(addListButton)]--> AddListForm
	AddListForm --[push(cancelButton)]--> Master
	Master --[push(addListButton)]--> AddListForm
	AddListForm --[push(backButton)]--> Master
	*/

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

	opaTest("When add list cancel button is pressed, should navigate to master.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAddListFormPage.iPressTheCancelButton();

		// Assertions
		Then.onTheMasterPage.iShouldSeeTheMasterPage();
	});

	opaTest("Should be displayed the add list form.", function (Given, When, Then) {
		//Actions
		When.onTheMasterPage.iPressTheAddListButton();
		// Assertions
		Then.onTheAddListFormPage.iShouldSeeTheAddListForm().and.iShouldSeeTheListNameInput();

	});

	opaTest("When add list back button is pressed, should navigate to master.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAddListFormPage.iPressTheNavButton();

		// Assertions
		Then.onTheMasterPage.iShouldSeeTheMasterPage();
	});

	/*
	Master --[push(firstList())]--> Detail, Items
	Detail -->[push(planningTab)]--> Planning
	Detail -->[push(shippingTab)]--> Shipping
	Detail -->[push(itemsTab)]--> Items
	Detail -->[push(backButton)]--> Shipping
	Detail -->[push(backButton)]--> Planning
	Detail -->[push(backButton)]--> Items
	*/
	
	opaTest("When I select the first list, the details should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheMasterPage.iSelectTheFirstList();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onTheItemsPage.iShouldSeeTheItemsTable();
	});

	opaTest("When I push the planning tab, the planning should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressThePlanningTab();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onThePlanningPage.iShouldSeeThePlanningTable();
	});

	opaTest("When I push the shipping tab, the shipping should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressTheShippingTab();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onTheShippingPage.iShouldSeeTheShippingTable();
	});

	opaTest("When I push the items tab, the items should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressTheItemsTab();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onTheItemsPage.iShouldSeeTheItemsTable();
	});

	opaTest("When I back button, the shipping should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressTheBackButton();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onTheShippingPage.iShouldSeeTheShippingTable();
	});

	opaTest("When I back button, the planning should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressTheBackButton();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onThePlanningPage.iShouldSeeThePlanningTable();
	});

	opaTest("When I back button, the items should be displayed.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheDetailPage.iPressTheBackButton();

		// Assertions
		Then.onTheDetailPage.iShouldSeeTheDetailPage();
		Then.onTheItemsPage.iShouldSeeTheItemsTable();
	});

	/*
	Items -->[push(addItemButton)]--> AddItemForm
	AddItemForm --[push(cancelButton)]--> Items
	Items -->[push(addItemButton)]--> AddItemForm
	AddItemForm --[push(backButton)]--> Items
	*/

	opaTest("Should be displayed the add item view.", function (Given, When, Then) {
		
		//Actions
		When.onTheItemsPage.iPressTheAddItemButton();

		// Assertions
		Then.onTheAddItemFormPage.iShouldSeeTheAddItemFormPage();

	});

	opaTest("When add list cancel button is pressed, should navigate to master and display the details of the first list.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAddItemFormPage.iPressTheCancelButton();

		// Assertions
		Then.onTheItemsPage.iShouldSeeTheItemsTable();
	});

	opaTest("Should be displayed the add item view.", function (Given, When, Then) {
		//Actions
		When.onTheItemsPage.iPressTheAddItemButton();
		// Assertions
		Then.onTheAddItemFormPage.iShouldSeeTheAddItemFormPage();

	});

	opaTest("When add list back button is pressed, should navigate to master.", function (Given, When, Then) {
		// Arrangements

		//Actions
		When.onTheAddItemFormPage.iPressTheNavButton();

		// Assertions
		Then.onTheItemsPage.iShouldSeeTheItemsTable();

	});

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});

});