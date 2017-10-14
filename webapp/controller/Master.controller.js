sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/Device",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, jQuery, Device, formatter) {
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
				})
				.catch( reason => console.error(reason) )
				.then( () => this.setBusy(false) );
		},

		onListDeleted: function(channel, event, listId){
			this.setBusy(true);
			
			if (this._listId === listId)
				this._listId = undefined;

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
			
			this._listId = oEvent.getParameter("arguments").listId;
			
			this._listId ?
				this.refreshLists(false) : this.refreshLists(true);

		},

		_onMasterPatternMatched: function(oEvent){

			this.detachRoutes();
			
			this.refreshLists(true);
			
		},

		onSearch: function(oEvent) {
			this._searchQuery = oEvent.getSource().getValue();
			this.refreshLists();
		},

		listSelected: function(){
			return this._listId !== undefined;
		},

		selectFirst: function(selectFirst=(!Device.system.phone)){
			var lists = this.getModel().getObject('/');			
			if (selectFirst && !this.listSelected() && lists.length>0){
				this.getRouter().navTo("detail",{
					listId: lists[0].id,
				});
			}
		},

		refreshLists: function(selectFirst=True){

			this.setBusy(true);

			var query = {};

			if (this._searchQuery)
				query = {
					search: this._searchQuery
				};
			
			query.ordering = '-date,-id';

			this.loadAndBindModel('lists?' + jQuery.param(query))
				.then( data => selectFirst && this.selectFirst() )
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

	});
});