/* global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"iamsoft/agroeco/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"iamsoft/agroeco/test/integration/pages/App",
	"iamsoft/agroeco/test/integration/pages/Master",
	"iamsoft/agroeco/test/integration/pages/Detail",
	"iamsoft/agroeco/test/integration/pages/AddListForm",
	"iamsoft/agroeco/test/integration/pages/AddItemForm",
	"iamsoft/agroeco/test/integration/pages/detail/Items",
	"iamsoft/agroeco/test/integration/pages/detail/Planning",
	"iamsoft/agroeco/test/integration/pages/detail/Shipping",
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "iamsoft.agroeco.view."
	});

	sap.ui.require([
		"iamsoft/agroeco/test/integration/navigationJourney",
		"iamsoft/agroeco/test/integration/uriJourney",
		"iamsoft/agroeco/test/integration/journeys/addItemJourney",
	], function () {
		QUnit.start();
	});
});