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
				`items/?purchase_list=${this._listId}&expand=product_uom.product,product_uom.uom`).then(
					function(data){
						var eventBus = sap.ui.getCore().getEventBus();
						// 1. ChannelName, 2. EventName, 3. the data
						eventBus.publish("ListChannel", "onItemsLoaded", data);
					}
				);
		},

		onAddItem: function(){
			this.getRouter().navTo("addItem", {listId: this._listId});
		},

		onAddResolution: function(){
			var aContexts = this.getView().byId("itemsTable").getSelectedContexts();
			if (aContexts && aContexts.length) {
				var itemId = aContexts[0].getObject().id; 
				return this.getRouter().navTo("addResolution",{
					listId: this._listId,
					itemId: itemId
				})
			}	
		},

		onRemoveItem: function(oEvent){
			this.removeFromTable("itemsTable", function(object){
				return this.delete(`items/${object.id}/`);
			}.bind(this)).then(
				function(data){
					this.refreshItems();
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this));
		},
	
		resolve: function(){
			return this.post(`lists/${this._listId}/resolutions/`);
		},

		onResolve: function(){
			this.resolve().then(function(){
				// this.getRouter().navTo('planning',{
				// 	listId: this._listId
				// })
				this.refreshItems();
				var eventBus = sap.ui.getCore().getEventBus();
				eventBus.publish("ListChannel", "onListChanged", this._listId);
			}.bind(this));
		}

	});
});