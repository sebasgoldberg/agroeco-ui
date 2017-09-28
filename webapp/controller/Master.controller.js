sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global"
], function(BaseController, jQuery) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("addList").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("addItem").attachPatternMatched(this._onMasterMatched, this);
			
		},

		_onMasterMatched: function(){

			this.refreshLists();

		},

		onSearch: function(oEvent) {
			this._searchQuery = oEvent.getSource().getValue();
			this.refreshLists();
		},

		refreshLists: function(){
			var query = '';
			if (this._searchQuery){
				query = jQuery.param({
					search: this._searchQuery
				})
			}
			this.loadAndBindModel('lists?' + query);
		},

		onAddItem: function(){
			this.getRouter().navTo("addList");
		}



	});
});