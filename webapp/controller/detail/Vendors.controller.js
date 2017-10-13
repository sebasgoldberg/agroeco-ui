sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Vendors", {

		formatter: formatter,
		
		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("vendors").attachMatched(this._onVendorsMatched, this);

		},

		_onVendorsMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		setSelectedVendors: function(vendors, list){
			this.getView().byId('vendorsTable').getItems().forEach(
				item => {
					let vendor = item.getBindingContext().getObject();
					if (list.vendors.indexOf(vendor.id) >= 0)
						// @todo Verificar si hay que llamarlo como setSelected(true, true)
						item.setSelected(true);
				}
			);
			this.getModel().refresh();
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return;
			if (listId)
				this._listId = listId;
			Promise.all([
				this.loadAndBindModel(`vendors/`),
				this.loadAndBindModel(`lists/${this._listId}/`,{modelName:"list"}),
			])
			.then( values => this.setSelectedVendors(values[0], values[1]) )
			.catch( reasons => console.error(reasons) );
		},

		save: function(filterVendors, selectedVendorIds){
			this.patch(`lists/${this._listId}/`, {
				vendors: selectedVendorIds,
				filter_vendors: filterVendors,
			})
		},

		onSave: function(){
			var aContexts = this.getView().byId("vendorsTable").getSelectedContexts();
			selectedVendorIds = aContexts.map(
				oContext => oContext.getObject().id 
			);
			this.save(
				this.getModel('list').getProperty('filter_vendors'),
				selectedVendorIds
			)
		},

	});
});