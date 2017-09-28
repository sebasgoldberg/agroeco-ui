sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddItemForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'product_uom/?expand=product,uom',
				'products');

			this.getRouter().getRoute("addItem").attachPatternMatched(this._onAddItemMatched, this);
				
		},

		_onAddItemMatched: function(){

		},

		onAdd: function(){
			this.navBack();
		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});