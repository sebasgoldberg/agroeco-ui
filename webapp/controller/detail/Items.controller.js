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
			this.refresh(oEvent.getParameter("arguments").listId);
			this.refreshItems(this._listId);
		},

		getQueryParams: function(){
			return 'expand=product_uom.product,product_uom.uom';
		},

		refresh: function(listId=undefined){
			if (this._listId == listId)
				return;
			if (listId)
				this._listId = listId;
			this.refreshItems();
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&${this.getQueryParams()}`).then(
					function(data){
						var eventBus = sap.ui.getCore().getEventBus();
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

		removeDeletedItems: function(deletedItems){
			let oModel = this.getModel();
			let deletedItemsIds = deletedItems.map( (item) => item.id );
			let itemsNotRemoved = oModel.getData().filter(
				item => deletedItemsIds.indexOf(item.id) < 0 
			);
			oModel.setData(itemsNotRemoved);
			oModel.refresh();
		},

		onRemoveItem: function(oEvent){
			this.removeFromTable("itemsTable", object =>
				this.delete(`items/${object.id}/`).then( 
					() => object
				)
			).then(
				deletedItems => {
					this.removeDeletedItems(deletedItems);
					this.notifyListChanged();
				},
				reason => console.error(reason)
			);
		},
		
		_changeQuantityFromSource(oSource){
			var oBindingContext = oSource.getBindingContext();
			var oItem = oBindingContext.getObject();
			this.patch(`items/${oItem.id}/`, {
				quantity: oItem.quantity,
			})
			.then(function(oUpdatedItem){
				this.notifyListChanged();
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
			sap.m.MessageToast.show("Presione Enter para modificar.")
		},

		onSubmitQuantity: function(oEvent){
			this._changeQuantityFromSource(oEvent.getSource());
		},

		onResolve: function(){
			this.post(`lists/${this._listId}/resolutions/`).then(
				result => {
					this.notifyListChanged();
					this.refresh();
				}
			);
		}

	});
});