sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	'sap/m/MessageToast',
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Planning", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("planning").attachMatched(this._onItemsMatched, this);

		},

		_onItemsMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;

			this.refreshItems();
		},

		onRemoveResolution: function(oEvent){
			this.removeFromTable("resolutionsTable", function(object){
				return this.delete(`resolutions/${object.id}/`);
			}.bind(this)).then(
				function(data){
					this.refreshItems();
					var eventBus = sap.ui.getCore().getEventBus();
					eventBus.publish("ListChannel", "onListChanged", this._listId);
			}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this));
		},

		refreshItems: function(){
			this.loadAndBindModel(
				`resolutions/?item__purchase_list=${this._listId}&expand=vendor_product.vendor,vendor_product.product_uom.uom`)
				.then(
					function(data){
						var eventBus = sap.ui.getCore().getEventBus();
						// 1. ChannelName, 2. EventName, 3. the data
						eventBus.publish("ListChannel", "onResolutionsLoaded", data);
					}
				);
		},

		// sendResolutions(){
		// 	return this.post(
		// 		`lists/${this._listId}/email/`,
		// 		{
		// 			email: 'sebas.goldberg@gmail.com'
		// 		}
		// 	);
		// },

		// onSendResolutions: function(){
		// 	this.sendResolutions().then(
		// 		function(data){
		// 			MessageToast.show(data.status);
		// 		}.bind(this),
		// 		function(reason){
		// 			MessageToast.show(reason.status);
		// 		}
		// 	);
		// }

	});
});