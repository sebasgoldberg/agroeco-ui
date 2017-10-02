sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/Device",	
], function(BaseController, jQuery, Device) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("master").attachMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterPatternMatched, this);
			
		},

		_onMasterMatched: function(oEvent){

			this._listId = oEvent.getParameter("arguments").listId;
			
			this.refreshLists(false);

		},

		_onMasterPatternMatched: function(oEvent){

			this._listId = oEvent.getParameter("arguments").listId;
			
			this.refreshLists();

		},

		onSearch: function(oEvent) {
			this._searchQuery = oEvent.getSource().getValue();
			this.refreshLists();
		},

		listSelected: function(){
			return this._listId !== undefined;
		},

		refreshLists: function(selectFirst=(!Device.system.phone)){
			var query = {};
			if (this._searchQuery)
				query = {
					search: this._searchQuery
				};
			
			query.ordering = '-date,-id';
			this.loadAndBindModel('lists?' + jQuery.param(query)).then(
				function(data){
					if (selectFirst && !this.listSelected() && data.length>0){
						this.getRouter().navTo("items",{
							listId: data[0].id,
						});
					}
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this)
			);
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