sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global"
], function(BaseController, jQuery) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("master").attachMatched(this._onMasterMatched, this);
			
		},

		_onMasterMatched: function(){

			this.refreshLists();

		},

		onSearch: function(oEvent) {
			this._searchQuery = oEvent.getSource().getValue();
			this.refreshLists();
		},

		refreshLists: function(){
			var query = {};
			if (this._searchQuery)
				query = {
					search: this._searchQuery
				};
			
			query.ordering = '-date,-id';
			this.loadAndBindModel('lists?' + jQuery.param(query));
		},

		onAddItem: function(){
			this.getRouter().navTo("addList");
		},

		onSelectList: function(oEvent){
			var oList = oEvent.getSource();
			this.getRouter().navTo("items", {
				listId : oList.getBindingContext().getProperty("id")
			}, true);
		},

	});
});