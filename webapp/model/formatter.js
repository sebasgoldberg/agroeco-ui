sap.ui.define([], function () {

	"use strict";

	return {
		listStatusText: function (iPendingItems) {
			if (iPendingItems==0)
				return "Planificado";
			return iPendingItems+" Pendiente(s)";
		},

		listStatusState: function (iPendingItems) {
			if (iPendingItems==0)
				return "Success";
			return "Error";
		},

	};
});