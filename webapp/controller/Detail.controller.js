sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		busyControl: "listDetail",

		formatter: formatter,

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.setBusy(false);

			var oModel = new JSONModel({
				selectedTabKey: "",
			});

			this.getView().setModel(oModel, 'view');

			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("ListChannel", "onItemsLoaded", this.onTabLoaded, this);
			eventBus.subscribe("ListChannel", "onResolutionsLoaded", this.onTabLoaded, this);
			eventBus.subscribe("ListChannel", "onShippingLoaded", this.onTabLoaded, this);
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

			["items", "planning", "shipping"].forEach(function(tabName){
				this.getRouter().getRoute(tabName).attachMatched(function(){
					this.getModel("view").setProperty("/selectedTabKey", tabName);
				}, this);
			}.bind(this));

		},

		onTabLoaded: function(channel, event, data){
			this.refresh();
		},

		_onDetailMatched: function (oEvent) {
			this._listId =  oEvent.getParameter("arguments").listId;
			this.refresh();
		},

		refresh: function(){
			this.setBusy(true);
			this.loadAndBindModel(`lists/${this._listId}/`).then(function(data){
				this.setBusy(false);
			}.bind(this));
		},

		onDeleteList: function(oEvent){
			this.setBusy(true);
			var listId = this.getModel().getProperty('/id');
			this.delete(`lists/${listId}/`).then(
				function(data){
					var eventBus = sap.ui.getCore().getEventBus();
					this.getRouter().navTo('master');
					eventBus.publish("ListChannel", "onListDeleted", listId);
					this.setBusy(false);
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this)
			);
		},

		onTabSelect : function (oEvent){
			var listId =  this.getModel().getProperty("/id");						
			var selectedKey = oEvent.getParameter("selectedKey");
			this.getRouter().navTo(selectedKey, {
				listId : listId,
			});
		},

		handleNavButtonPress:function(){
			this.getRouter().navTo('master');
		},

	});
});