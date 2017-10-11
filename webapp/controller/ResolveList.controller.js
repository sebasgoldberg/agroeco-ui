sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel, BindingMode) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.ResolveList", {

		busyControl: "resolveListPage",

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("resolveList").attachPatternMatched(this._onResolveListMatched, this);
				
		},

		refreshVendorsList: function(){
			this.setBusy(true);
			this.getView().unbindElement('vendors');
			let query = {
			};
			this.loadAndBindModel(
				'vendors?' + jQuery.param(query),{ 
					modelName:'vendors'
				})
				.then( data => this.setBusy(false))
				.catch( reason => this.setBusy(false));
		},

		_onResolveListMatched: function(oEvent){
			this._listId =  oEvent.getParameter("arguments").listId;			
			this.refreshVendorsList();
		},

		resolve: function(vendorsIds){
			return this.post(`lists/${this._listId}/resolutions/`, vendorsIds);
		},

		onResolve: function(oEvent){

			var aContexts = this.getView().byId('vendorsList').getSelectedContexts();

			if (aContexts && aContexts.length) {

				var selectedVendorsIds = aContexts.map(
					oContext => {
						let vendor = oContext.getObject();
						return vendor.id;
					});
				
				this.resolve(selectedVendorsIds).then( () =>{
					this.notifyListChanged();
					this.getRouter().navTo('items',{
						listId: this._listId
					});
				});
			}
		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});