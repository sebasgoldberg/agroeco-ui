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

        getModel : function (sName) {
            return this.getView().getModel(sName);
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
            return new Promise(function(resolve, reject){

                var uriService = this.getUriService(relativeUri);

                jQuery.ajax(
                    uriService,
                    {
                        dataType: "json",
                        success: function(data){
                            var oModel = new JSONModel(data);
                            this.getView().setModel(oModel, modelName);
                            this.getView().bindElement({path: bindPath, model: modelName})
                            resolve(data);
                        }.bind(this)
                    }
                ).fail(function( jqXHR, textStatus, errorThrown ) {
                    reject(jqXHR)
                });

            }.bind(this));
        },

        post: function(relativeUri, data){
            return new Promise(function(resolve, reject){

                var uriService = this.getUriService(relativeUri);
                
                jQuery.ajax(uriService,
                    {
                        type : "POST",
                        contentType : "application/json",
                        dataType : "json",
                        data: data,
                        success : function(data,textStatus, jqXHR) {
                            resolve(data);
                        }
                    }
                ).fail(function( jqXHR, textStatus, errorThrown ) {
                    reject(jqXHR.responseJSON)
                });
                
            }.bind(this));
        },

        delete: function(relativeUri){
            return new Promise(function(resolve, reject){

                var uriService = this.getUriService(relativeUri);
                
                jQuery.ajax(uriService,
                    {
                        type : "DELETE",
                        contentType : "application/json",
                        dataType : "json",
                        success : function(data,textStatus, jqXHR) {
                            resolve(data);
                        }
                    }
                ).fail(function( jqXHR, textStatus, errorThrown ) {
                    reject(jqXHR.responseJSON)
                });
                
            }.bind(this));
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