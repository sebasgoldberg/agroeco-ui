sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("iamsoft.agroeco.controller.BaseController", {

		onInit: function () {
            this._baseUriService = this.getOwnerComponent()
                .getManifestEntry('/sap.app/dataSources/mainService/uri');
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

        }

	});
});