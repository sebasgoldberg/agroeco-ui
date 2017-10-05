/*global QUnit*/

sap.ui.define([
	"iamsoft/agroeco/model/formatter"
], function(formatter) {
	"use strict";

	QUnit.module("Formatters");

	function listStatusTextTestCase(iPendingItems, expected, assert){
		assert.strictEqual(formatter.listStatusText(iPendingItems), expected, "The status text is correct");
	}
	
	QUnit.test("When is undefined or null, the text should be empty.", function (assert) {
		listStatusTextTestCase(undefined, "", assert);
		listStatusTextTestCase(null, "", assert);
	});
	
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

	function itemStatusTextTestCase(bIsSolved, expected, assert){
		assert.strictEqual(formatter.itemStatusText(bIsSolved), expected, "The status text is correct");
	}

	QUnit.test("When is undefined or null, the text should be empty.", function (assert) {
		itemStatusTextTestCase(null, "", assert);
		itemStatusTextTestCase(undefined, "", assert);
	});

	QUnit.test("When is solved, the item text should be something like solved.", function (assert) {
		itemStatusTextTestCase(true, "Resuelto", assert);
	});

	QUnit.test("When is not solved, the item text should be something like unsolved.", function (assert) {
		itemStatusTextTestCase(false, "Pendiente", assert);
	});

	function itemStatusStateTestCase(bIsSolved, expected, assert){
		assert.strictEqual(formatter.itemStatusState(bIsSolved), expected, "The status state is correct");
	}

	QUnit.test("When is solved, the state should be successful.", function (assert) {
		itemStatusStateTestCase(true, "Success", assert);
	});

	QUnit.test("When is not solved, the state should be unsuccessful.", function (assert) {
		itemStatusStateTestCase(false, "Error", assert);
	});

	function itemSurplusQuantityStateTestCase(iQuantity, iSurplusQuantity, expected, assert){
		assert.strictEqual(formatter.itemSurplusQuantityState(iQuantity, iSurplusQuantity), expected, "The surplus quantity state is correct");
	}

	QUnit.test("When surplus quantity is less than 10%, the state should be successful.", function (assert) {
		itemSurplusQuantityStateTestCase(100, 0, "Success", assert);
		itemSurplusQuantityStateTestCase(100, 9, "Success", assert);
	});

	QUnit.test("When surplus quantity is between 10% and 30%, the state should be warning.", function (assert) {
		itemSurplusQuantityStateTestCase(100, 10, "Warning", assert);
		itemSurplusQuantityStateTestCase(100, 17, "Warning", assert);
		itemSurplusQuantityStateTestCase(100, 30, "Warning", assert);
	});

	QUnit.test("When surplus quantity is more than 30%, the state should be unsuccessful.", function (assert) {
		itemSurplusQuantityStateTestCase(100, 31, "Error", assert);
		itemSurplusQuantityStateTestCase(100, 9999, "Error", assert);
	});

	QUnit.test("When quantity and surplus quantity are 0, the state should be none.", function (assert) {
		itemSurplusQuantityStateTestCase(0, 0, "None", assert);
	});

	QUnit.test("When quantity is 0 but surplus quantity is not 0, the state should be unsuccessful.", function (assert) {
		itemSurplusQuantityStateTestCase(0, 2, "Error", assert);
	});

	function shippingPriceStateTestCase(bIsLowerPrice, expected, assert){
		assert.strictEqual(formatter.shippingPriceState(bIsLowerPrice), expected, "The shipping price state is correct");
	}

	QUnit.test("When is solved, the state should be successful.", function (assert) {
		shippingPriceStateTestCase(true, "Success", assert);
	});

	QUnit.test("When is not solved, the state should be unsuccessful.", function (assert) {
		shippingPriceStateTestCase(false, "Warning", assert);
	});


});
