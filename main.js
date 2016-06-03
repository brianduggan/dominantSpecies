console.log("loaded");

var data = {
  'animals': ['Mammals', 'Reptiles', 'Birds', 'Amphibians', 'Arachnids', 'Insects'],
  'elements': ['Grass', 'Grub', 'Meat', 'Seed', 'Sun', 'Water']
};

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var clearButton = function(){
  $('#clear').on('click', function(e){
    e.preventDefault();
    $('div[class*="display-"] h6').text(0);
  })
}

var getActiveAnimals = function(){
  var activesEl = $('.active:checked').toArray();
  actives = [];
  activesEl.forEach(function(animal){
    var name = $(animal).data('active');
    actives.push(name)
  })
  return actives
}

var grabAnimalElems = function(animal){
  var ogElems = data.elements;
  var animal = animal;
  var nums = []
  for (var i = 0; i < ogElems.length; i++) {
    var elem = ogElems[i].toLowerCase();
    var total = $('h6#elem-display-'+animal+'-'+elem).text();
    nums.push(total);
  }
  return {'grass': nums[0], 'grub': nums[1], 'meat': nums[2], 'seed': nums[3], 'sun': nums[4], 'water': nums[5]}
}

var grabHexElems = function(){
  var $hexEls = $('.calc-display').toArray();
  var nums = []
  console.log($hexEls);
  $hexEls.forEach(function(el){
    var value = parseInt($(el).text());
    console.log(value);
    nums.push(value)
  });
  return {'grass': nums[0], 'grub': nums[1], 'meat': nums[2], 'seed': nums[3], 'sun': nums[4], 'water': nums[5]}
}

var addTotals = function(anim, hex){
  return (anim.grass * hex.grass) + (anim.grub * hex.grub) + (anim.meat * hex.meat) + (anim.seed * hex.seed) + (anim.sun * hex.sun) + (anim.water * hex.water);
}

var comparison = function(){
  var actives = getActiveAnimals();
  var hexElems = grabHexElems();
  var base = 0;
  var current = "";
  for (var i = 0; i < actives.length; i++) {
    var active = actives[i]
    var elems = grabAnimalElems(active);
    var total = addTotals(elems, hexElems);
    console.log(active, total);
    if (total > base) {
      base = total;
      current = active;
      $('#dominant').text(cap(current)+" are dominant!");
    } else if (total === base){
      $('#dominant').text("There is no dominance");
    }
  }
}

var addHexElement = function(){
  $('button.add-hex-elem').on('click', function(e){
    e.preventDefault();
    var elem = $(this).data('hex-elem');
    console.log(elem);
    var $el = $('h6#hex-display-'+elem)
    var val = parseInt($el.text());
    $el.text(val+=1);
    // comparison();
  })
}

var removeHexElement = function(){
  $('button.remove-hex-elem').on('click', function(e){
    e.preventDefault();
    var elem = $(this).data('hex-elem');
    console.log(elem);
    var $el = $('h6#hex-display-'+elem)
    var val = parseInt($el.text());
    if (val > 0){
      $el.text(val-=1);
      // comparison();
    }
  })
}

// must add defaults to each animal... and fail-safes for adding and removing logically //
var addElement = function(){
  $('button.add-elem').on('click', function(e){
    e.preventDefault();
    var elem = $(this).data('elem-name');
    var anim = $(this).data('animal-name');
    var $el = $('h6#elem-display-'+anim+"-"+elem)
    var val = parseInt($el.text());
    $el.text(val+=1);
    // comparison();
  })
}

var removeElement = function(){
  $('button.remove-elem').on('click', function(e){
    e.preventDefault();
    var elem = $(this).data('elem-name');
    var anim = $(this).data('animal-name');
    var $el = $('h6#elem-display-'+anim+"-"+elem)
    var val = parseInt($el.text());
    $el.text(val-=1);
  })
}

var changeHandler = function(){
  $('button, input').on('click', function(){
    comparison();
  })
}

var templater = function (){
  var source = $('#animals-temp').html();
  var template = Handlebars.compile(source);
  var compiledHTML = template(data);
  $('#players-section').append(compiledHTML);

  var source2 = $('#elements-temp').html();
  var template2 = Handlebars.compile(source2);
  var compiled = template2(data);
  $('#calculator-container').append(compiled);
}

$(document).ready(function(){

  templater();
  clearButton();
  addElement();
  removeElement();
  addHexElement();
  removeHexElement();
  changeHandler();
})



// whitespace
