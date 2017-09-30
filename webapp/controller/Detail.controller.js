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

			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

			this.getRouter().getRoute("items").attachMatched(function(){
				this.getModel("view").setProperty("/selectedTabKey", "items")
			}, this);

			this.getRouter().getRoute("planning").attachMatched(function(){
				this.getModel("view").setProperty("/selectedTabKey", "planning")
			}, this);

		},

		_onDetailMatched: function (oEvent) {
			this.getModel().setData({});
			var listId =  oEvent.getParameter("arguments").listId;
			this.loadAndBindModel(`lists/${listId}/`);
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
		}

	});
});