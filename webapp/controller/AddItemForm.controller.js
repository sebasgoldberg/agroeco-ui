sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel, BindingMode) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddItemForm", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			var oModel = new JSONModel({
				purchase_list: "",
				search: "",
				vendor: "",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})

			this.loadAndBindModel(
				'vendors',{ 
					modelName:'vendors', 
				});

			this.getRouter().getRoute("addItem").attachPatternMatched(this._onAddItemMatched, this);
				
		},

		onChangeVendor: function(oControlEvent){
			this.refreshProductsList();
		},

		onSearchProduct: function(oControlEvent){
			this.refreshProductsList();
		},

		refreshProductsList: function(){
			this.getView().unbindElement('products');
			let query = {
				expand: "product,uom",
			};
			this._form = this.getModel('form').getData();
			if (this._form.vendor)
				query.vendorproduct__vendor = this._form.vendor
			if (this._form.search)
				query.search = this._form.search
			this.loadAndBindModel(
				'product_uom?' + jQuery.param(query),{ 
					modelName:'products', 
					sizeLimit:10000,
				});
		},

		_onAddItemMatched: function(oEvent){
			this._listId =  oEvent.getParameter("arguments").listId;			
			var oModel = new JSONModel({
				purchase_list: this._listId,
				search: "",
				vendor: "",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})
			this.refreshProductsList();
		},

		onAdd: function(){

			var aContexts = this.getView().byId('productsList').getSelectedContexts();

			if (aContexts && aContexts.length) {

				var promises = aContexts.map(function(oContext) {
					let product = oContext.getObject()
					return this.post('items/', JSON.stringify({
						product_uom: product.id,
						quantity: 0,
						puchase_list: Number(this._listId),
					}));
				}.bind(this));

				return Promise.all(promises).then(
					function(data){
						var eventBus = sap.ui.getCore().getEventBus();
						eventBus.publish("ListChannel", "onListChanged", this._listId);	
						this.getRouter().navTo('items', {listId: this._listId});
					}.bind(this),
					function(reason){
						console.error(reason);
					}.bind(this)
				);
			}

			return new Promise(function(resolve, reject){
				reject("Debe seleccionar al menos un item.");
			})

			//////////////////
			// var data = this.getModel('form').getData();
			// this.post('items/', JSON.stringify(data)).then(
			// 	function(data){
			// 		var eventBus = sap.ui.getCore().getEventBus();
			// 		eventBus.publish("ListChannel", "onListChanged", data['purchase_list']);	
			// 		this.getRouter().navTo('items', {listId: data['purchase_list']});
			// 	}.bind(this),
			// 	function(reason){
			// 		console.error(reason);
			// 	}.bind(this)
			// );

		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});