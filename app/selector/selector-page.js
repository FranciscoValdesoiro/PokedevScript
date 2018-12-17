var frameModule = require("tns-core-modules/ui/frame");
const ListPicker = require("tns-core-modules/ui/list-picker").ListPicker;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const aUrl = 'https://pokeapi.co/api/v2/pokemon/';
let resultados = {};

function onNavigatingTo(args) {
    var page = args.object;

    function peticionAjax(aUrl, callback) {
        var peticion = new XMLHttpRequest();
        peticion.open('GET', aUrl);
        peticion.onreadystatechange = function () {
            if (this.readyState === 4) {
              callback(this.responseText);
            } else {
              //  funcion cargando
              console.log('cargando');
            }
          };
        peticion.send();
    }

    peticionAjax(aUrl, function(data){
      resultados = JSON.parse(data);
      console.log("estos son los datos " + resultados);
      return resultados;
    });

    const pokemons = resultados;
    // const pokemonList = resultados;
    const pokemonList = resultados.results;

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
