/*global QUnit*/

sap.ui.define([
	"iamsoft/agroeco/controller/App.controller"
], function(oController) {
	"use strict";

	QUnit.module("App Controller");

	QUnit.test("I should test the app controller", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
