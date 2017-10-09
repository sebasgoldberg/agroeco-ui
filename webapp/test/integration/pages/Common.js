sap.ui.define([
	"sap/ui/test/Opa5"
], function(Opa5) {
	"use strict";

	function getFrameUrl (sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("iamsoft/agroeco/app", ".html");
		sHash = sHash || "";
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "";
		}

		return sUrl + sUrlParameters + sHash;
	}

	return Opa5.extend("iamsoft.agroeco.test.integration.pages.Common", {

		iStartTheApp : function (oOptions) {
			oOptions = oOptions || {};
			// Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash));
		},

		iLookAtTheScreen : function () {
			return this;
		},

		allLooksOK: function(){
			return this.waitFor({
				success: function(){
					Opa5.assert.ok(true);
				}
			});
		},

		iWaitSomeSeconds: function(iSeconds){
			var pendingSeconds = iSeconds;
			return this.waitFor({
				timeout: iSeconds+10,
				pollingInterval: 1000,
				check: function(){
					pendingSeconds--;
					return pendingSeconds <= 0;
				},
				success: function(){
					Opa5.assert.ok(true);
				}
			});
		},

		iShouldSeeThe: function(controlId){
			return this.waitFor({
				id: controlId,
				viewName: this.sViewName,
				success: function () {
					Opa5.assert.ok(true, "The "+controlId+" is displayed".);
				},
				errorMessage: "Did not find the "+controlId
			});					
		},

	});

});