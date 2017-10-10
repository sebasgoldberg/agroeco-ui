sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Items", {

		formatter: formatter,
		
		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("items").attachMatched(this._onItemsMatched, this);

		},

		_onItemsMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			this.refreshItems();
		},

		getQueryParams: function(){
			return 'expand=product_uom.product,product_uom.uom';
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&${this.getQueryParams()}`).then(
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
					this._notifyListChanged();
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this));
		},
		
		_changeQuantityFromSource(oSource){
			var oBindingContext = oSource.getBindingContext();
			var oItem = oBindingContext.getObject();
			this.patch(`items/${oItem.id}/`, {
				quantity: oItem.quantity,
			})
			.then(function(oUpdatedItem){
				this._notifyListChanged();
				return this.get(`items/${oItem.id}/?${this.getQueryParams()}`)
			}.bind(this))
			.then(function(oUpdatedItem){
				Object.assign(oItem,oUpdatedItem);
				oBindingContext.getModel().refresh();		
			})
			.catch(function(reason){
				console.error(reason);
			});
		},

		onQuantityChange: function(oEvent){
			this._changeQuantityFromSource(oEvent.getSource());
		},

		onSubmitQuantity: function(oEvent){
			this._changeQuantityFromSource(oEvent.getSource());
		},

		resolve: function(){
			return this.post(`lists/${this._listId}/resolutions/`);
		},

		_notifyListChanged: function(){
			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("ListChannel", "onListChanged", this._listId);
		},

		onResolve: function(){
			this.resolve().then(function(){
				// this.getRouter().navTo('planning',{
				// 	listId: this._listId
				// })
				this.refreshItems();
				this._notifyListChanged();
			}.bind(this));
		}

	});
});