(function () {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemBought = this;
    console.log("AlreadyBoughtController");

    itemBought.items = ShoppingListCheckOffService.getItemsBought();

    itemBought.isEmpty = function () {
      if (this.items.length == 0) {
        return true;
      } else {
        return false;
      }
    };
  }

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    console.log("ToBuyController");

    var showList = this;

    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("oranges", "5");
    ShoppingListCheckOffService.addItemToBuy("bananas", "8");
    ShoppingListCheckOffService.addItemToBuy("grapes", "20");
    ShoppingListCheckOffService.addItemToBuy("onions", "2");

    showList.items = ShoppingListCheckOffService.getItemsToBuy();

    showList.boughtItem = function (index) {
      ShoppingListCheckOffService.boughtItem(index);
    };

    showList.isFull = function () {
      if (this.items.length == 0) {
        return true;
      } else {
        return false;
      }
    };
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var itemsToBuy = [];
    var itemsBought = [];

    service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity,
      };
      itemsToBuy.push(item);
    };

    service.boughtItem = function (index) {
      itemsBought.push(itemsToBuy[index]);
      itemsToBuy.splice(index, 1);
    };

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getItemsBought = function () {
      return itemsBought;
    };
  }
})();
