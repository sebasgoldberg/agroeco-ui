sap.ui.define([
	"iamsoft/agroeco/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/Device",
	"iamsoft/agroeco/model/formatter",
], function(BaseController, jQuery, Device, formatter) {
	"use strict";

	return BaseController.extend("iamsoft.agroeco.controller.Master", {

		formatter: formatter,

		busyControl: "masterList",

		onInit: function () {

			BaseController.prototype.onInit.bind(this)();

			this.getRouter().getRoute("master").attachMatched(this._onMasterMatched, this);
			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterPatternMatched, this);

			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.subscribe("ListChannel", "onListChanged", this.onLisChanged, this);
			eventBus.subscribe("ListChannel", "onListAdded", this.onLisAdded, this);
			eventBus.subscribe("ListChannel", "onListDeleted", this.onListDeleted, this);

		},

		onLisChanged: function(channel, event, listId){
			this.setBusy(true);
			this.get(`lists/${listId}`).then(
				function(updatedList){
					var lists = this.getModel().getObject('/')
					var updatedLists = lists.map(function(list){
						if (list.id == listId)
							return updatedList;
						return list
					});
					this.getModel().setData(updatedLists);
					this.setBusy(false);					
				}.bind(this),
				function(reason){
					console.error(reason);
				}
			);

		},

		onLisAdded: function(channel, event, listId){
			this.setBusy(true);
			this.get(`lists/${listId}`).then(
				function(newList){
					var lists = this.getModel().getObject('/');
					lists.unshift(newList);
					this.getModel().setData(lists);
					this.setBusy(false);					
				}.bind(this),
				function(reason){
					console.error(reason);
				}
			);

		},

		onListDeleted: function(channel, event, listId){
			this.setBusy(true);

			if (this._listId === listId)
				this._listId = undefined;
			var lists = this.getModel().getObject('/');
			var updatedLists = lists.filter(function(list){
				return list.id !== listId;
			});
			this.getModel().setData(updatedLists);
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
			
			this.refreshLists();

		},

		_onMasterPatternMatched: function(oEvent){

			this.detachRoutes();

			this._listId = oEvent.getParameter("arguments").listId;
			
			this.refreshLists();
			
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
				this.getRouter().navTo("items",{
					listId: lists[0].id,
				});
			}
		},

		refreshLists: function(){
			this.setBusy(true);
			var query = {};
			if (this._searchQuery)
				query = {
					search: this._searchQuery
				};
			
			query.ordering = '-date,-id';
			this.loadAndBindModel('lists?' + jQuery.param(query)).then(
				function(data){
					this.selectFirst();
					this.setBusy(false);
				}.bind(this),
				function(reason){
					console.error(reason);
				}.bind(this)
			);
		},

		onAddItem: function(){
			this.getRouter().navTo("addList");
		},

		onSelectList: function(oEvent){
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			// var oList = oEvent.getSource();
			this.getRouter().navTo("items", {
				// listId : oList.getBindingContext().getProperty("id")
				listId: oItem.getBindingContext().getProperty("id")
			}, true);
		},

	});
});