let isHex2Rgb = true;

$(function() {
  UI.displayColors();
  $('.side-nav__icon').on('click', function() {
    openNav();
  });

  $('.side-nav__close-btn').on('click', function(e) {
    closeNav();
  });
  let bgColorR = generateRandomNum(252, 3);
      bgColorG = generateRandomNum(252, 3);
      bgColorB = generateRandomNum(252, 3);
      key = generateRandomNum(3, 1);
      bgFlag = 0,
      n = 0;

  $('body').css('background-color', 'rgb(' + bgColorR + ',' + bgColorG + ',' + bgColorB + ')');
  $('body').on('click', function() {
    clearInterval(bgColorChanger);
  });

  let bgColorChanger = setInterval(() => {
    n = generateRandomNum(3, 1);
    if(bgColorR >= 255 || bgColorG >= 255 || bgColorB >= 255) {
      bgFlag = 1; //minus
      key = generateRandomNum(3, 1);
    } else if (bgColorR <= 0 || bgColorG <= 0 || bgColorB <= 0) {
      bgFlag = 0; //plus
      key = generateRandomNum(3, 1);
    }

    if(key === 1) {
      if(bgFlag === 1) {
        if(bgColorR > 0) {
          bgColorR -= generateRandomNum(3, 1);
        } else {
          if(bgColorG > 0) {
            bgColorG -= generateRandomNum(3, 1);
          } else {
            if(bgColorB > 0) {
              bgColorB -= generateRandomNum(3, 1);
            }
          }
        }
      } else {
        if(bgColorR < 255) {
          bgColorR += generateRandomNum(3, 1);
        } else {
          if(bgColorG < 255) {
            bgColorG += generateRandomNum(3, 1);
          } else {
            if(bgColorB < 255) {
              bgColorB += generateRandomNum(3, 1);
            } 
          }
        }
      }
    } else if(key === 2) {
      if(bgFlag === 1) {
        if(n === 1) { //RGB(X, O, O)
          if(bgColorG > 0) {
            bgColorG -= generateRandomNum(3, 1);
          }
          if(bgColorB > 0) {
            bgColorB -= generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 0) + generateRandomNum(3, 1);
          }
        } else if(n === 2) { //RGB(O, X, O)
          if(bgColorR > 0) {
            bgColorR -= generateRandomNum(3, 1);
          }
          if(bgColorB > 0) {
            bgColorB -= generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 1);
          }
        } else { //RGB(O, O, X)
          if(bgColorR > 0) {
            bgColorR -= generateRandomNum(3, 1);
          } 
          if (bgColorG > 0) {
            bgColorR -= generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 1);
          }
        }
      } else {
        if(n === 1) {
          if(bgColorG < 255) {
            bgColorG += generateRandomNum(3, 1);
          }
          if(bgColorB < 255) {
            bgColorB += generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 1);
          }
        } else if(n === 2) {
          if(bgColorR < 255) {
            bgColorR += generateRandomNum(3, 1);
          }
          if(bgColorB < 255) {
            bgColorB += generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 1);
          }
        } else {
          if(bgColorR < 255) {
            bgColorR += generateRandomNum(3, 1);
          }
          if(bgColorG < 255) {
            bgColorG += generateRandomNum(3, 1);
          } else {
            key = generateRandomNum(3, 1);
          }
        }
      } 
    } else {
      if(n === 1) {
        if(bgColorR > 0) {
          bgColorR -= generateRandomNum(3, 1);
        }
        if(bgColorG > 0) {
          bgColorG -= generateRandomNum(3, 1);
        }
        if(bgColorB > 0) {
          bgColorB -= generateRandomNum(3, 1);
        }
      } else {
        if(bgColorR < 255) {
          bgColorR += generateRandomNum(3, 1);
        }
        if(bgColorG < 255) {
          bgColorG += generateRandomNum(3, 1);
        }
        if(bgColorB < 255) {
          bgColorB += generateRandomNum(3, 1);
        }
      }
    }
    $('body').css('background-color', 'rgb(' + bgColorR + ',' + bgColorG + ',' + bgColorB + ')');
    changeFontColor([bgColorR, bgColorG, bgColorB]);
  }, 50);

  //Event: Add a color
$('.btn-fav').on('click', (e) => {
  e.preventDefault();
  //Get color codes
  let hexFav, rgbFav, nameFav;
  //Save fav color
  if (checkValidation($('#input-value').val()) && $('#input-fav-color-name').val().length != 0) {
    if (isHex2Rgb === true) {
      hexFav = $('#input-value').val();
      rgbFav = $('#output-value').val();
    } else {
      rgbFav = $('#input-value').val();
      hexFav = $('#output-value').val();
    }
    nameFav = $('#input-fav-color-name').val();

    //Instatntiate color
    const color = new Color(hexFav, rgbFav, nameFav);

    //Add color to UI (palette)
    UI.addColorToPalette(color);

    //Add color to storage
    let result = Store.addColor(color);

    //Clear the form
    $('#hex2rgb-form').trigger('reset');
    $('#input-fav-color-name').val('');

    UI.showAlert('Your favourite color has added to the Palette!', 'success');
    changeBackgroundColor('#F0F0F0');
    changeFontColor([255, 255, 255]);
  } else if ($('#input-fav-color-name').val().length === 0) { //If color name hasn't set yet
    UI.showAlert('Please set the name of your favourite color!', 'danger');
  } else { //If both HEX and RGB values are not valid
    UI.showAlert('Please check if HEX code or RGB code is valid or not.', 'danger');
  }
});

//Event: Remove a color
$('.side-nav__container').on('click', (e) => {
  //Remove color from UI
  let status = UI.deleteColor(e.target);

  if (status === 0) {
    Store.removeColor(e.target.nextSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.textContent);
    UI.showAlert('Color Removed!', 'success');
  }
});

//Event: Toggle button
let $checkbox = $( "input:checkbox" );
$checkbox.change(function() {
  $('#input-value').val('');
  $('#output-value').val('');
  //HEX -> RGB
  if ($checkbox.is(':checked')) {
    isHex2Rgb = true;
    document.title = 'HEX TO RGB';
    $('.container__title-front').text('HEX');
    $('.container__title-back').text('RGB');
    $('#input-value-label').text('HEX');
    $('#input-value').attr('placeholder', '#4286F4');
    $('#output-value-label').text('RGB');
    $('#input-value').attr('maxLength', '7');
    $('.btn-fav').css('background-color', 'rgb(91,158,251)'); //#FF4081
    $('.btn-fav').css('border-color', 'rgb(91,158,251)');
    $('.side-nav__icon').css('background-color', 'rgb(91,158,251)');
  }
  //RGB -> HEX
  else {
    isHex2Rgb = false;
    document.title = 'RGB TO HEX';
    $('.container__title-front').text('RGB');
    $('.container__title-back').text('HEX');
    $('#input-value-label').text('RGB');
    $('#input-value').attr('placeholder', '(66,134,244)');
    $('#output-value-label').text('HEX');
    $('#input-value').attr('maxLength', '13');
    $('.btn-fav').css('background-color', 'rgb(84,208,104)'); //#9C27B0
    $('.btn-fav').css('border-color', 'rgb(84,208,104)');
    $('.side-nav__icon').css('background-color', 'rgb(84,208,104)');
  }
});
});

/**
 * genereateRandomNum() generates random number
 * for background color changing effect
 * 
 * @param {*} i 
 * @param {*} j 
 */
function generateRandomNum(i, j) {
  return Math.floor(Math.random() * i) + j;
}

/**
 * openNav() makes favourite colour palette width 100
 * giving effect like slide open 
 */
function openNav() {
  $('#palette').css('width', '100%');
}

/**
 * closeNav() makes favourite colour palette width 0
 * giving effect like slide close
 */
function closeNav() {
  $('#palette').css('width', '0');
}

/**
 * getValue() manages user input
 */
function getValue() {
  //Reset value in other fields
  $('#output-value').val('');

  //Get input value, and check validation of the value
  let val = $('#input-value').val(),
      valid = checkValidation(val);

  //After input once when user delete all value,
  //these codes make input underline color black
  if (valid === false && val.length === 0) {
    $('#input-value').removeClass('non-valid');
    $('#input-value').addClass('container__form-container__input');
    hexToRgb('#F0F0F0');
    //HEX -> RGB
    if (isHex2Rgb === true) {
      setInputFormValue('output-value', '(,,)');
    } else {
      setInputFormValue('output-value', '#');
    }
  } else if (valid === false) { //If user input unvalidated value
    $('#input-value').removeClass('container__form-container__input');
    $('#input-value').addClass('non-valid');
    hexToRgb('#F0F0F0');
    //HEX -> RGB
    if (isHex2Rgb === true) {
      setInputFormValue('output-value', '(,,)');
    } else {
      setInputFormValue('output-value', '#');
    }
  } else if (valid === true) { //If user input validated value
    $('#input-value').removeClass('non-valid');
    $('#input-value').addClass('container__form-container__input');
    if (isHex2Rgb === true) {
      hexToRgb(val);
    } else {
      rgbToHex(val);
    }
  }
}

/**
 * checkValidation() checks validation of user's input
 * @param {String} val 
 * @return {Boolean}  
 */
function checkValidation(val) {
  let rex;
  //HEX -> RGB
  if (isHex2Rgb === true) {
    rex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  }
  //RGB -> HEX
  else {
    rex = /\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;
  }
  return rex.test(val);
}

/**
 * hexToRgb() changes hex color code to rgb code
 * @param {String} hex 
 */
function hexToRgb(hex) {
  let res = hex.split('#'), //remove hashtag(#)
      val = res[1],
      rgb = [0, 0, 0],
      result;
  //#123, 3 digits hex code
  if (val.length === 3) {
    let r = val.slice(0, 1) + val.slice(0, 1);
    let g = val.slice(1, 2) + val.slice(1, 2);
    let b = val.slice(2, 3) + val.slice(2, 3);

    r = parseInt('0x' + r, 16);
    g = parseInt('0x' + g, 16);
    b = parseInt('0x' + b, 16);
    rgb = [r, g, b];
    result = '(' + r + ', ' + g + ', ' + b + ')';
  } else { //#123456, 6 digits hex code
    let r = val.slice(0, 2),
        g = val.slice(2, 4),
        b = val.slice(4, 6);

    r = parseInt('0x' + r, 16);
    g = parseInt('0x' + g, 16);
    b = parseInt('0x' + b, 16);
    rgb = [r, g, b];
    result = '(' + r + ', ' + g + ', ' + b + ')';
  }
  $('#output-value').val(result);
  changeBackgroundColor(hex);
  changeFontColor(rgb);
}

/**
 * rgbToHex() changes rgb color code to hex code
 * @param {String} rgb 
 */
function rgbToHex(rgb) {
  let res = rgb.replace('(', '').replace(')', ''),
      val = res.split(','),
      r = val[0],
      g = val[1],
      b = val[2],
      result;

  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length === 1) {
    r = '0' + r;
  }
  if (g.length === 1) {
    g = '0' + g;
  }
  if (b.length === 1) {
    b = '0' + b;
  }
  result = '#' + r + g + b;
  result = result.toUpperCase();
  $('#output-value').val(result);
  changeBackgroundColor(result);
  changeFontColor([val[0], val[1], val[2]]);
}

/**
 * changeBackgroundColor() changes body background color
 * @param {String} hex 
 */
function changeBackgroundColor(hex) {
  $('body').css('background-color', hex);
}

/**
 * setInputFormValue() can set valueText 
 * to the tag which has the idName
 * @param {String} idName 
 * @param {String} valueText 
 */
function setInputFormValue(idName, valueText) {
  $('#'+idName).val(valueText);
}

/**
 * changeFontColor() changes the font color depends background color
 * @param {Array} rgb 
 */
function changeFontColor(rgb) {
  let o = Math.round((parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000);
  let fore = o > 125 ? '#212121' : '#FFFFFF';

  $('.container__title-front, .container__title-back, #input-value-label, #output-value-label, #input-fav-color-name-label').css('transition', 'color 0.5s ease');
  $('.container__title-front, .container__title-back, #input-value-label, #output-value-label, #input-fav-color-name-label').css('color', fore);
  // $('label').css('color', fore);
}

//Color class: Color object
class Color {
  constructor(hex, rgb, name) {
    this.hex = hex;
    this.rgb = rgb;
    this.name = name;
  }
}

//UI class: Handle UI tasks
class UI {
  static displayColors() {
    const colors = Store.getColors();
    colors.forEach((color) => UI.addColorToPalette(color));
  }

  static addColorToPalette(color) {
    const $palette = $('.side-nav__container');
    const $item = $(`<div class="side-nav__container__item"  style="background-color: ${color.hex}">
                        <p class="side-nav__container__item__delete">&times;</p>
                        <div class="side-nav__container__item__data">
                          <p>${color.hex}</p><p>RGB${color.rgb}</p>
                          <p class="side-nav__container__item__data__name">${color.name}</p>
                        </div>
                      </div>`);
    $palette.append($item);
  }

  static deleteColor(el) {
    if ($(el).hasClass('side-nav__container__item__delete')) {
      let check = confirm('Remove this color?');
      if (check) {
        $(el).parent().remove(); 
        return 0;
      }
      return 1;
    }
    return -1;
  }

  static showAlert(message, className) {
    const $messageContainer = $(`<div class="alert alert-${className} mt-3">
                    ${message}
                  </div>`);
    const $title = $('.container__title');
    $messageContainer.insertBefore($title);

    //Vanish in 3 seconds
    setTimeout(() => $('.alert').remove(), 1500);
  }
}

//Store class: Handles storage(local Storage)
class Store {
  static addColor(color) {
    const colors = Store.getColors();

    colors.push(color);
    localStorage.setItem('colors', JSON.stringify(colors));
  }

  static getColors() {
    let colors;

    if (localStorage.getItem('colors') === null) {
      colors = [];
    } else {
      colors = JSON.parse(localStorage.getItem('colors'));
    }

    return colors;
  }

  static removeColor(hexFav) {
    const colors = Store.getColors();

    colors.forEach((color, index) => {
      if (color.hex === hexFav) {
        colors.splice(index, 1);
      }
    });

    localStorage.setItem('colors', JSON.stringify(colors));
  }
}