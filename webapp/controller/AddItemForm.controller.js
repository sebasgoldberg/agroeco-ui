sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"sap/ui/model/json/JSONModel",
], function(BaseController, JSONModel, BindingMode) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.AddItemForm", {

		busyControl: "addItemFormPage",

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			var oModel = new JSONModel({
				purchase_list: "",
				search: "",
				vendor: "",
			});
			this.getView().setModel(oModel, 'form');
			this.getView().bindElement({path: '/', model: 'form'})

			this.getRouter().getRoute("addItem").attachPatternMatched(this._onAddItemMatched, this);
				
		},

		onChangeVendor: function(oControlEvent){
			this.refreshProductsList();
		},

		onSearchProduct: function(oControlEvent){
			this.refreshProductsList();
		},

		onSubmitQuantity: function(oEvent){
			window.setTimeout(
				() => this.getView().byId("productsTable").setKeyboardMode("Edit"),
				100
			);
		},

		onQuantityChange: function(oEvent){
			let oInput = oEvent.getSource()
			let oItem = oInput.getParent();
			oItem.setSelected(true);
		},

		refreshProductsList: function(){
			this.setBusy(true);
			this.getView().unbindElement('products');
			let query = {
				expand: "product,uom",
			};
			this._form = this.getModel('form').getData();
			if (this._form.vendor)
				query.vendorproduct__vendor = this._form.vendor;
			if (this._form.search)
				query.search = this._form.search;
			query.list_to_exclude = this._form.purchase_list;
			query.list_id = this._form.purchase_list;
			this.loadAndBindModel(
				'product_uom?' + jQuery.param(query),{ 
					modelName:'products', 
					sizeLimit:10000,
				})
				.then( data => {
					data.forEach( product => product.quantity = 0 );
					this.getModel('products').refresh();
				})
				.then( data => this.setBusy(false))
				.catch( reason => this.setBusy(false));
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

			let query = {
				list_id: this._listId
			};

			this.loadAndBindModel(
				'vendors?'+jQuery.param(query),{ 
					modelName:'vendors', 
				}).then( () => {
					let oModel = this.getModel('vendors');
					let vendors = oModel.getObject('/');
					vendors.unshift({
						id: undefined,
						name: "Cualquier Proveedor",
					});
					// oModel.setData(vendors);
					oModel.refresh();
				})
				.then( () => this.refreshProductsList());
		},

		onAdd: function(){

			var aContexts = this.getView().byId('productsTable').getSelectedContexts();

			if (aContexts && aContexts.length) {

				var promises = aContexts.map(function(oContext) {
					let product = oContext.getObject()
					return this.post('items/', {
						product_uom: product.id,
						quantity: product.quantity,
						purchase_list: Number(this._listId),
					});
				}.bind(this));

				this.setBusy(true);

				return Promise.all(promises)
					.then( data => {
						var eventBus = sap.ui.getCore().getEventBus();
						eventBus.publish("ListChannel", "onListChanged", this._listId);	
						this.getRouter().navTo('detail', {listId: this._listId});
					})
					.catch(reason => console.error(reason) )
					.then( () => this.setBusy(false) );
			}

			return new Promise(function(resolve, reject){
				reject("Debe seleccionar al menos un item.");
			})

		},

		onCancel: function(){
			this.navBack();
		},

		onNavBack: function(){
			this.navBack();
		}

	});
});