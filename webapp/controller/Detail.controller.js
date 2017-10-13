sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		busyControl: "detailPage",

		formatter: formatter,

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.setBusy(false);

			var oModel = new JSONModel({
				selectedTabKey: "",
			});

			this.getView().setModel(oModel, 'view');

			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

			["vendors", "items", "planning", "shipping"].forEach(function(tabName){
				this.getRouter().getRoute(tabName).attachMatched(function(){
					this.getModel("view").setProperty("/selectedTabKey", tabName);
				}, this);
			}.bind(this));

		},

		onListChanged: function(channel, event, listId){
			this.refresh();
		},

		_onDetailMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return
			if (listId)
				this._listId = listId
			// this.setBusy(true);
			this.loadAndBindModel(`lists/${this._listId}/`).then(
				data => this.setBusy(false)
			).catch( reason => {
				this.setBusy(false);
				return Promise.reject(reason);
			});
		},

		onDeleteList: function(oEvent){
			this.setBusy(true);
			var listId = this.getModel().getProperty('/id');
			this.delete(`lists/${listId}/`).then(
				data => {
					var eventBus = sap.ui.getCore().getEventBus();
					this.getRouter().navTo('master');
					eventBus.publish("ListChannel", "onListDeleted", listId);
					this.setBusy(false);
				},
				reason => console.error(reason)
			);
		},

		onTabSelect : function (oEvent){
			var selectedKey = oEvent.getParameter("selectedKey");
			this.getRouter().navTo(selectedKey, {
				listId : this._listId,
			});
		},

		handleNavButtonPress:function(){
			this.getRouter().navTo('master');
		},

	});
});