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
				itemsCount: "",
				resolutionsCount: "",
			});

			this.getView().setModel(oModel, 'view');

			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("ListChannel", "onItemsLoaded", this.onItemsLoaded, this);
			eventBus.subscribe("ListChannel", "onResolutionsLoaded", this.onResolutionsLoaded, this);
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

			this.getRouter().getRoute("items").attachMatched(function(){
				this.getModel("view").setProperty("/selectedTabKey", "items")
			}, this);

			this.getRouter().getRoute("planning").attachMatched(function(){
				this.getModel("view").setProperty("/selectedTabKey", "planning")
			}, this);

		},

		onItemsLoaded: function(channel, event, data){
			this.getModel().setProperty('/itemsCount', data.length)
			this.refresh();
		},

		onResolutionsLoaded: function(channel, event, data){
			this.getModel().setProperty('/resolutionsCount', data.length)
			this.refresh();
		},

		_onDetailMatched: function (oEvent) {
			this.getModel().setData({});
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