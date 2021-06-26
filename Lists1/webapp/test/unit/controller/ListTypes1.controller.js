/*global QUnit*/

sap.ui.define([
	"logaligroup/Lists1/controller/ListTypes1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ListTypes1 Controller");

	QUnit.test("I should test the ListTypes1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
