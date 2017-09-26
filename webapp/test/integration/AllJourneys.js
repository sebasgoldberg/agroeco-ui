/* global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"iamsoft/agroeco/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "iamsoft.agroeco.view."
	});

	sap.ui.require([
		"iamsoft/agroeco/test/integration/navigationJourney"
	], function () {
		QUnit.start();
	});
});