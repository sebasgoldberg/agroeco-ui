sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
    "sap/ui/model/BindingMode",
], function(Controller, JSONModel, History, BindingMode) {
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

        loadAndBindModel: function(relativeUri, options){

            var _options = Object.assign({},{ 
                modelName:undefined, 
                bindPath:'/', 
                sizeLimit:100,
            }, options || {});

            return new Promise(function(resolve, reject){

                var uriService = this.getUriService(relativeUri);

                jQuery.ajax(
                    uriService,
                    {
                        dataType: "json",
                        success: function(data){
                            var oModel = new JSONModel(data);
                            oModel.setSizeLimit(_options.sizeLimit);
                            this.getView().setModel(oModel, _options.modelName);
                            this.getView().bindElement({path: _options.bindPath, model: _options.modelName})
                            resolve(data);
                        }.bind(this)
                    }
                ).fail(function( jqXHR, textStatus, errorThrown ) {
                    reject(jqXHR)
                });

            }.bind(this));
        },

        get: function(relativeUri){
            return new Promise(function(resolve, reject){

                var uriService = this.getUriService(relativeUri);
                
                jQuery.ajax(uriService,
                    {
                        type : "GET",
                        contentType : "application/json",
                        dataType : "json",
                        success : function(data, textStatus, jqXHR) {
                            resolve(data);
                        }
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

		removeFromTable: function(tableId, deleterPromiseCreator){
			var aContexts = this.getView().byId(tableId).getSelectedContexts();

			if (aContexts && aContexts.length) {

				var deletePromises = aContexts.map(function(oContext) {
					return deleterPromiseCreator(oContext.getObject());
				}.bind(this));

				return Promise.all(deletePromises);
			}

			return new Promise(function(resolve, reject){
				reject("Debe seleccionar al menos un item.");
			})
		},

		setBusy: function(bIsBusy){
			var oControl = this.getView().byId(this.busyControl);
			oControl.setBusy(bIsBusy);
		},

	});
});