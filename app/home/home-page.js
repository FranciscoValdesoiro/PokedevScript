
var frameModule = require("tns-core-modules/ui/frame");
var HomeViewModel = require("./home-view-model");

var homeViewModel = new HomeViewModel();

function pageLoaded(args) {

  var page = args.object;

  page.bindingContext = homeViewModel;
}

exports.pageLoaded = pageLoaded;

exports.goToSelector = function () {
  // console.log("Navigating");
  var navigationOptions = {
    moduleName: 'selector/selector-page',
    context: {
      param1: "value1",
      param2: "value2"
    }
  }

  frameModule.topmost().navigate(navigationOptions);
}
