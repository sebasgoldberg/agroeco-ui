sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	'sap/m/MessageToast',
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.detail.Planning", {

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("planning").attachMatched(this._onPlanningMatched, this);

		},

		_onPlanningMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		removeDeletedResolutions: function(deletedResolutions){
			let oModel = this.getModel();
			let deletedResolutionsIds = deletedResolutions.map( (item) => item.id );
			let resolutionsNotRemoved = oModel.getData().filter(
				resolution => deletedResolutionsIds.indexOf(resolution.id) < 0 
			);
			oModel.setData(resolutionsNotRemoved);
			oModel.refresh();
		},

		onRemoveResolution: function(oEvent){
			this.removeFromTable("resolutionsTable", 
				object =>
					this.delete(`resolutions/${object.id}/`)
					.then( () => object )
			)
			.then(
				deletedResolutions => {
					this.removeDeletedResolutions(deletedResolutions);
					this.notifyListChanged();
				},
				reason => console.error(reason)
			);
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return;
			if (listId)
				this._listId = listId;
			this.loadAndBindModel(
				`resolutions/?item__purchase_list=${this._listId}&expand=vendor_product.vendor,vendor_product.product_uom.uom`);
		},

	});
});