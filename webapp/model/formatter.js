sap.ui.define([], function () {

	"use strict";

	return {
		listStatusText: function (iPendingItems) {
			if (iPendingItems==undefined || iPendingItems==null)
				return "";
			if (iPendingItems==0)
				return "Planificado";
			return iPendingItems+" Pendiente(s)";
		},

		listStatusState: function (iPendingItems) {
			if (iPendingItems==0)
				return "Success";
			return "Error";
		},

		itemStatusText: function (bIsSolved) {
			if (bIsSolved==undefined || bIsSolved==null)
				return "";
			if (bIsSolved)
				return "Resuelto";
			return "Pendiente";
		},

		itemStatusState: function (bIsSolved) {
			if (bIsSolved)
				return "Success";
			return "Error";
		},

		itemSurplusQuantityState: function(iQuantity, iSurplusQuantity){
			if (iQuantity == 0){
				if ( iSurplusQuantity == 0 )
					return "None";
				return "Error"
			}
			var iRelation = iSurplusQuantity / iQuantity;
			if (iRelation < 0.1)
				return "Success";
			if (iRelation <= 0.3)
				return "Warning";
			return "Error";
		},

		shippingPriceState: function(bIsLowerPrice){
			if (bIsLowerPrice)
				return "Success";
			return "Warning";
		}

	};
});