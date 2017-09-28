sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddListForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.loadAndBindModel(
				'product_uom/?expand=product,uom',
				'products');

			this.getRouter().getRoute("addList").attachPatternMatched(this._onAddListMatched, this);
				
		},

		_onAddListMatched: function(){

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