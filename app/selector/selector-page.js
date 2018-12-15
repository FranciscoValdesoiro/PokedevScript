var frameModule = require("tns-core-modules/ui/frame");
const ListPicker = require("tns-core-modules/ui/list-picker").ListPicker;
const fromObject = require("tns-core-modules/data/observable").fromObject;

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() {
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
          }

          anHttpRequest.open( "GET", aUrl, true );
          anHttpRequest.send( null );
      }
    }
    var theurl='https://pokeapi.co/api/v2/pokemon/';
    var client = new HttpClient();
      client.get(theurl, function(response) {
        var response1 = JSON.parse(response);

      });

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}


function onNavigatingTo(args) {
    var page = args.object;

    const pokemons = httpGet("https://pokeapi.co/api/v2/pokemon/");

    const pokemonList = ["Bulbasaur", "Parasect", "Venonat", "Venomoth", "Diglett",
        "Dugtrio", "Meowth", "Persian", "Psyduck", "Arcanine", "Poliwrath", "Machoke"];

    const vm = fromObject({
        pickerItems: pokemonList,
        index: 2
    });
    const vmm = fromObject({
        pickerItems: pokemons,
        index: 2
    });
    page.bindingContext = vm;

    var gotData = page.navigationContext;
    console.log(gotData.param1);
    console.log(gotData.param2);
}
exports.onNavigatingTo = onNavigatingTo;
exports.changePage = function () {
  // console.log("Navigating");
  var navigationOptions = {
    moduleName: 'home/home-page',
    context: {
      param1: "value1",
      param2: "value2"
    }
  }

  frameModule.topmost().navigate(navigationOptions);
}
