// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.Lists1.controller.ListTypes1", {
            onInit: function() {


                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },

            getGroupHeader: function(oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                 });
                return groupHeaderListItem;
            },

            onShowSelectRows: function() {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                sap.m.MessageToast.show(i18nModel.getText("noSelection"));

                if (selectedItems.lenght === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));

                } else {
                    var textMessage = i18nModel.getText("selection");

                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        textMessage = textMessage + " - " + oContext.Material;
                    }
                    sap.m.MessageToast.show(textMessage);
                }
            },

            onDeleteSelectRows: function() {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems.lenght === 0) {
                    
                    var textMessage = i18nModel.getText("noselection");
                    sap.m.MessageToast.show(textMessage)
                   // sap.m.MessageToast.show(i18nModel.getText("noSelection"));

                } else {

                    var textMessage = i18nModel.getText("selection");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products")
                    var arrayId = [];

                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();

                        arrayId.push(oContext.Id);
                        textMessage = textMessage + "** Borrado de la lista -> " + oContext.Material;
                    }
                        products = products.filter(function(p) {
                            // returna las posiciones que quedan despues de eliminar las marcadas
                         return !arrayId.includes(p.Id)

                        });

                        model.setProperty("/Products", products);
                        standardList.removeSelections();
                        sap.m.MessageToast.show(textMessage);
                }
            },
            onDeleteRow: function(oEvent) {
                    var selectedRow = oEvent.getParameter("listItem");
                    var context = selectedRow.getBindingContext();
                    var splitPath = context.getPath().split("/");
                    alert(splitPath);
                    var indexSelectedRow = splitPath[splitPath.lenght-1];
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");
                        products.splice(indexSelectedRow,1);
                        model.refresh();
            }
        });
    });
