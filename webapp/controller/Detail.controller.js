sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

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
			this.loadAndBindModel(`lists/${this._listId}/`);			
		},

		onDeleteList: function(oEvent){
			var listId = this.getModel().getProperty('/id');
			this.delete(`lists/${listId}/`).then(
				function(data){
					this.getRouter().navTo('master');
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
			}, true /*without history*/);
		},

		handleNavButtonPress:function(){
			this.getRouter().navTo('master');
		},

	});
});