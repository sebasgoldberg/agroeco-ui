sap.ui.define([
	"iamsoft/agroeco/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

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

	});
});