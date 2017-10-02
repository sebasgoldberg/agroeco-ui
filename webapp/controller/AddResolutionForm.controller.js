sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel, BindingMode) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddResolutionForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("addResolution").attachPatternMatched(this._onAddResolutionMatched, this);
				
		},

		_onAddResolutionMatched: function(oEvent){
			this._listId =  oEvent.getParameter("arguments").listId;
			this._itemId =  oEvent.getParameter("arguments").itemId;

			this.loadAndBindModel(
				`vendors-products/?expand=vendor&product_uom__plist_items=${this._itemId}`,{ 
					modelName:'products', 
					sizeLimit:10000,
				});

			var oModel = new JSONModel({
				item: this._itemId,
				vendor_product: "",
				quantity: "",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})
		},

		onAdd: function(){
			var data = this.getModel('form').getData();
			this.post('resolutions/', JSON.stringify(data)).then(
				function(data){
					this.getRouter().navTo('planning', {listId: this._listId});
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this)
			);

		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});