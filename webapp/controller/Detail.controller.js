sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		busyControl: "detailPage",

		formatter: formatter,

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.setBusy(false);

			var oModel = new JSONModel({
				selectedTabKey: "",
			});

			this.getView().setModel(oModel, 'view');

			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);

			["vendors", "items", "planning", "shipping"].forEach( 
				tabName =>
					this.getRouter().getRoute(tabName).attachMatched( 
						() => 
							this.getModel("view").setProperty("/selectedTabKey", tabName)
					)
			);

		},

		onListChanged: function(channel, event, listId){
			this.refresh();
		},

		_onDetailMatched: function (oEvent) {
			this.refresh(oEvent.getParameter("arguments").listId);
		},

		refresh: function(listId){
			if (this._listId && this._listId == listId)
				return
			if (listId)
				this._listId = listId
			this.setBusy(true);
			this.loadAndBindModel(`lists/${this._listId}/`)
				.catch( reason => console.log(reason) )
				.then( () => this.setBusy(false) );
		},

		onDeleteList: function(oEvent){
			this.setBusy(true);
			var listId = this.getModel().getProperty('/id');
			this.delete(`lists/${listId}/`).then(
				data => {
					var eventBus = sap.ui.getCore().getEventBus();
					this.getRouter().navTo('master');
					eventBus.publish("ListChannel", "onListDeleted", listId);
					this.setBusy(false);
				})
				.catch( reason => console.log(reason) )
				.then( () => this.setBusy(false) );
		},

		onTabSelect : function (oEvent){
			var selectedKey = oEvent.getParameter("selectedKey");
			this.getRouter().navTo(selectedKey, {
				listId : this._listId,
			});
		},

		handleNavButtonPress:function(){
			this.getRouter().navTo('master');
		},

	});
});