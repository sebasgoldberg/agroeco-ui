sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Items", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("items").attachMatched(this._onItemsMatched, this);

		},

		_onItemsMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			this.refreshItems();
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&expand=product_uom.product,product_uom.uom`);
		},

		onAddItem: function(){
			this.getRouter().navTo("addItem", {listId: this._listId});
		},

		onRemoveItem: function(oEvent){
			var aContexts = this.getView().byId("itemsTable").getSelectedContexts();

			if (aContexts && aContexts.length) {

				var deletePromises = aContexts.map(function(oContext) {
					var itemId = oContext.getObject().id; 
					return this.delete(`items/${itemId}/`)
				}.bind(this));

				// Wait for deletion of all items.
				Promise.all(deletePromises).then(
					function(data){
						this.refreshItems();
					}.bind(this),
					function(reason){
						console.error(reason);
					}.bind(this));
			}
		}

	});
});