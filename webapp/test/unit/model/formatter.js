/*global QUnit*/

sap.ui.define([
	"iamsoft/agroeco/model/formatter"
], function(formatter) {
	"use strict";

	QUnit.module("Formatters");

	function listStatusTextTestCase(iPendingItems, expected, assert){
		assert.strictEqual(formatter.listStatusText(iPendingItems), expected, "The status text is correct");
	}
	
	QUnit.test("When there are no pending items, the list should be planned.", function (assert) {
		listStatusTextTestCase(0, "Planificado", assert);
	});
	
	QUnit.test("When there are pending items, the list should be pending and display the quantity.", function (assert) {
		listStatusTextTestCase(2, "2 Pendiente(s)", assert);
	});

	function listStatusStateTestCase(iPendingItems, expected, assert){
		assert.strictEqual(formatter.listStatusState(iPendingItems), expected, "The status state is correct");
	}
	
	QUnit.test("When there are no pending items, the list status should be successful.", function (assert) {
		listStatusStateTestCase(0, "Success", assert);
	});
	
	QUnit.test("When there are pending items, the list status should unsuccessful.", function (assert) {
		listStatusStateTestCase(2, "Error", assert);
	});

});
