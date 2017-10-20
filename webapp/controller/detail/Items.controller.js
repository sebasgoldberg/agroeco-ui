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

			let eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);

			this._aChangedItems = [];
		},

		_onItemsMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		onListChanged: function(channel, event, listId){
			this.refresh();
		},

		getQueryParams: function(){
			return 'expand=product_uom.product,product_uom.uom';
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return;
			if (listId)
				this._listId = listId;
			this.refreshItems();
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`items/?purchase_list=${this._listId}&${this.getQueryParams()}`);
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
			this.setBusy(true);
			this.removeFromTable("itemsTable", object =>
				this.delete(`items/${object.id}/`).then( 
					() => object
				)
			)
			.then(
				deletedItems => {
					this.removeDeletedItems(deletedItems);
					this.notifyListChanged();
				})
			.catch( reason => console.error(reason) )
			.then( () => this.setBusy(false) );
		},
		
		onQuantityChange: function(oEvent){
			let oItem = oEvent.getSource().getBindingContext().getObject();
			if (this._aChangedItems.indexOf(oItem) < 0)
				this._aChangedItems.push(oItem);
		},

		submitChanges: function(){

			if (this._aChangedItems.length == 0)
				return;

			this.setBusy(true);
			Promise.all(
				this._aChangedItems.map( 
					oItem => 
						this.patch(`items/${oItem.id}/`, {
							quantity: oItem.quantity,
						}
					)
				)
			)
			.then( aUpdatedItems => {
				this.notifyListChanged();
				return Promise.all(this._aChangedItems.map( oItem =>
					this.get(`items/${oItem.id}/?${this.getQueryParams()}`)
				))
			})
			.then(aUpdatedItems => {
				for (let i=0; i<this._aChangedItems.length; i++)
					Object.assign(this._aChangedItems[i],aUpdatedItems[i]);
				this.getModel().refresh();
			})
			.catch(function(reason){
				console.error(reason);
			})
			.then( () => {
				this.getView().byId("itemsTable").setKeyboardMode("Edit");
				this._aChangedItems = [];
				this.setBusy(false);
			});
		},

		onSave: function(oEvent){
			this.submitChanges();
		},

		onSubmitQuantity: function(oEvent){
			this.submitChanges();
		},

	});
});