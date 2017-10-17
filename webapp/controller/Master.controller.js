sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/Device",
	"iamsoft/agroeco/model/formatter",
    "sap/ui/model/json/JSONModel",
], function(BaseController, jQuery, Device, formatter, JSONModel) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		formatter: formatter,

		busyControl: "masterPage",

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("master").attachMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterPatternMatched, this);

			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("ListChannel", "onListChanged", this.onListChanged, this);
			eventBus.subscribe("ListChannel", "onListAdded", this.onListAdded, this);
			eventBus.subscribe("ListChannel", "onListDeleted", this.onListDeleted, this);

		},

		onListChanged: function(channel, event, listId){
			this.setBusy(true);
			this.get(`lists/${listId}`)
				.then( updatedList => {
					let oModel = this.getModel();
					let lists = oModel.getObject('/')
					for (let i=0; i<lists.length; i++){
						if (lists[i].id == updatedList.id){
							lists[i] = updatedList;
							break;
						}
					}
					oModel.refresh();
				})
				.catch( reason => console.error(reason) )
				.then( () => this.setBusy(false) );
		},

		onListAdded: function(channel, event, listId){
			this.setBusy(true);
			this.get(`lists/${listId}`)
				.then( newList => {
					var lists = this.getModel().getObject('/');
					lists.unshift(newList);
					this.getModel().setData(lists);
					this.selectFirst();
				})
				.catch( reason => console.error(reason) )
				.then( () => this.setBusy(false) );
		},

		onListDeleted: function(channel, event, listId){
			this.setBusy(true);
			
			let oModel = this.getModel();
			let lists = oModel.getObject('/');

			for (let i=0; i<lists.length; i++){
				if (lists[i].id == listId){
					lists.splice(i, 1);
					break;
				}
			}
			oModel.refresh();

			this.selectFirst();

			this.setBusy(false);
		},

		detachRoutes: function(){
			this.getRouter().getRoute("master").detachMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("master").detachPatternMatched(this._onMasterPatternMatched, this);
		},

		_onMasterMatched: function(oEvent){

			this.detachRoutes();
			
			this.refreshLists(false);

		},

		_onMasterPatternMatched: function(oEvent){

			this.detachRoutes();
			
			this.refreshLists();
			
		},

		onSearch: function(oEvent) {
			this._searchQuery = oEvent.getSource().getValue();
			this.refreshLists(false);
		},

		selectFirst: function(selectFirst=(!Device.system.phone)){
			if (!selectFirst)
				return;
			let oList = this.getView().byId('listsList');
			let oItems = oList.getItems();
			if (oItems.length == 0)
				return;
			let oItem = oItems[0];
			oList.setSelectedItem(oItem, true);
			this.getRouter().navTo("detail",{
				listId: oItem.getBindingContext().getObject().id,
			});
		},

		refreshLists: function(selectFirst=true){

			this.setBusy(true);

			var query = {};

			if (this._searchQuery)
				query = {
					search: this._searchQuery
				};
			
			query.ordering = '-date,-id';

			query.limit = 6;

			this.get('lists?' + jQuery.param(query))
				.then( result => {
					var oModel = new JSONModel(result.results || result);
					this.getView().setModel(oModel);
					this.getView().bindElement('/');
					this._nextPage = result.next;
				})
				.then( () => this.addNextPage() )
				.then( () => selectFirst && this.selectFirst() )
				.catch( reason => console.error(reason) )
				.then( () => this.setBusy(false) );
		},

		onAddItem: function(){
			this.getRouter().navTo("addList");
		},

		onSelectList: function(oEvent){
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			this.getRouter().navTo("detail", {
				listId: oItem.getBindingContext().getProperty("id")
			});
		},

		addNextPage: function(){
			if (!this._nextPage)
				return Promise.resolve();
			return this.get(this._nextPage, false)
			.then( result => {
				this._nextPage = result.next;
				let oModel = this.getModel();
				let aLists = oModel.getObject('/');
				result.results.forEach( list => aLists.push(list) );
				oModel.refresh();
			})
		},

		onListUpdateStarted: function(oEvent){
			if (oEvent.getParameters().reason !== 'Growing')
				return;
			this.addNextPage()
				.catch( reason => this.error(reason) );
		},

	});
});