sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"iamsoft/agroeco/model/formatter",
	"sap/ui/model/json/JSONModel",
], function(BaseController, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Shipping", {

		formatter: formatter,
		
		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			var oModel = new JSONModel({
				cc: "ale.szmuch@gmail.com; sebas.goldberg@gmail.com",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})

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
			this.setBusy(true);
			if (listId)
				this._listId = listId;
			this.loadAndBindModel(
				`vendors-shipping-methods/?vendor__vproducts__resolutions__item__purchase_list=${this._listId}&expand=vendor&ordering=vendor`)
				.then( shippings => this.get(`lists/${this._listId}/vendors_subtotals/`) )
				.then( subtotals => {
					let oModel = this.getModel();
					let shippings = oModel.getObject('/');
					shippings.forEach( shipping => shipping.vendor.subtotal = subtotals[shipping.vendor.id] );
					oModel.refresh();
				})
				.catch( reason => this.error(reason) )
				.then( () => this.setBusy(false) );
			
		},

		onSendEmail(oEvent){
            let oTable = this.getView().byId("shippingTable")
			var aContexts = oTable.getSelectedContexts();

			if (!aContexts){
				this.error("Debe seleccionar al menos una forma de envío.");
				return;
			}

			this.setBusy(true);
			
			let cc = this.getModel('form').getProperty('/cc');
			cc = cc.split(';').map( x => x.replace(' ','') )

			Promise.all( 
				aContexts.map( oContext => {
					let shippingMethodId = oContext.getObject().id;
					return this.post(`lists/${this._listId}/email/`,{
						shipping_method: shippingMethodId,
						cc: cc,
					});
				})
			)
			.catch( reasons => this.error(reasons) )
			.then( () => this.setBusy(false) );
		},

	});
});