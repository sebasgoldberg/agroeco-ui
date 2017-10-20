sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	"iamsoft/agroeco/model/formatter",
	"sap/m/MessageBox",
], function(BaseController, JSONModel, formatter, MessageBox) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Detail", {

		busyControl: "detailPage",

		formatter: formatter,

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.setBusy(false);

			let tabNames = ["vendors", "items", "planning", "shipping"];

			var oModel = new JSONModel({
				selectedTabKey: tabNames[0],
			});

			this.getView().setModel(oModel, 'view');

			var eventBus = sap.ui.getCore().getEventBus();

			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);
			
			this.getRouter().getRoute("detail").attachMatched(this._onDetailMatched, this);
			this.getRouter().getRoute("detail").attachPatternMatched(this._onDetailPatternMatched, this);

			tabNames.forEach( 
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

		_onDetailPatternMatched: function (oEvent) {
			let selectedTabKey = this.getModel("view").getProperty("/selectedTabKey");
			let listId = oEvent.getParameter("arguments").listId;
			this.getRouter().navTo(selectedTabKey,{
				listId: listId,
			});
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
			
			new Promise( resolve => {
				MessageBox.show(
					"Realmente desea eliminar la lista?", {
						icon: sap.m.MessageBox.Icon.QUESTION,
						title: "Eliminar Lista",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: oAction => 
							(oAction == sap.m.MessageBox.Action.YES) && resolve()
					}
				  );
			})
			.then( () => {
				this.setBusy(true);
				var listId = this.getModel().getProperty('/id');
				this.delete(`lists/${listId}/`).then(
					data => {
						var eventBus = sap.ui.getCore().getEventBus();
						this.getRouter().navTo('master');
						eventBus.publish("ListChannel", "onListDeleted", listId);
					})
					.catch( reason => console.log(reason) )
					.then( () => this.setBusy(false) );	
			});
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

		onResolve: function(){
			this.setBusy(true);
			this.post(`lists/${this._listId}/resolutions/`).then(
				result => {
					this.notifyListChanged();
				}
			).catch( reason => this.erro(reason) )
			.then( () => this.setBusy(false) );
		},

	});
});