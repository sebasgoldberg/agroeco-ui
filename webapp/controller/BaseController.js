sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function(Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("iamsoft.agroeco.controller.BaseController", {

		onInit: function () {
            this._baseUriService = this.getOwnerComponent()
                .getManifestEntry('/sap.app/dataSources/mainService/uri');
        },

        getRouter : function () {
            return this.getOwnerComponent().getRouter();
        },

        getBaseUriService: function(){
            return this._baseUriService;
        },

        getUriService: function(relativeUri){
            return this.getBaseUriService() + relativeUri;
        },

        loadAndBindModel: function(relativeUri, modelName=undefined, bindPath='/'){

			var uriService = this.getUriService(relativeUri);

            jQuery.ajax(
                uriService,
                {
                    dataType: "json",
                    success: function(data){
                        var oModel = new sap.ui.model.json.JSONModel(data);
                        this.getView().setModel(oModel, modelName);
                        this.getView().bindElement({path: bindPath, model: modelName})
                    }.bind(this)
                }
            );

        },

		navBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true /*no history*/);
			}
        },

	});
});