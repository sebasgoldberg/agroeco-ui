sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Shipping", {

		formatter: formatter,
		
		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("shipping").attachMatched(this._onShippingMatched, this);

			let eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);

		},

		_onShippingMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		onListChanged: function(channel, event, listId){
			this.refresh();
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return;
			if (listId)
				this._listId = listId;
			this.loadAndBindModel(
				`vendors-shipping-methods/?vendor__vproducts__resolutions__item__purchase_list=${this._listId}&expand=vendor&ordering=vendor`);
		},

		onSendEmail(oEvent){
            let oTable = this.getView().byId("shippingTable")
			var aContexts = oTable.getSelectedContexts();

			if (!aContexts){
				this.error("Debe seleccionar al menos una forma de envío.");
				return;
			}

			this.setBusy(true);
			Promise.all( 
				aContexts.map( oContext => {
					let shippingMethodId = oContext.getObject().id;
					return this.post(`lists/${this._listId}/email/`,{
						shipping_method: shippingMethodId,
					});
				})
			)
			.catch( reasons => this.error(reasons) )
			.then( () => this.setBusy(false) );
		},

	});
});