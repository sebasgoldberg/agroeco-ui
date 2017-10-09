/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Add Item Journey");

	opaTest("Should see the add item page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartTheApp({
			hash:"/detail/50/items/add"
		});

		//Actions
		When.onTheAppPage.iLookAtTheScreen();

		// Assertions
		Then.onTheAddItemFormPage
			.iShouldSeeTheAddItemFormPage().and
			.iShouldSeeTheVendorSelect().and
			.iShouldSeeTheSearchInput().and
			.iShouldSeeTheProductsList()
			.iShouldSeeTheProductsInTheProductsList().and
			.iShouldSeeTheProductsNameForEachProduct();
	});

	opaTest("Should exit my app", function (Given, When, Then) {

		Then.onTheAppPage.allLooksOK().and.iTeardownMyAppFrame();

	});


});