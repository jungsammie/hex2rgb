var flag = 1;

function openNav() {
    document.getElementById("palette").style.width = "100%";
}

function closeNav() {
    document.getElementById("palette").style.width = "0";
}

function getValue() {
    //Reset value in other fields
    document.getElementById("output-value").value = "";

    //Get input value, and check validation of the value
    var val = document.getElementById("input-value").value;
    var valid = checkValidation(val);
    console.log(valid);

    //After input once when user delete all value, 
    //these codes make input underline color black 
    if(valid == false && val.length == 0) {
        document.getElementById("input-value").classList.remove("non-valid");
        document.getElementById("input-value").classList.add("container__form-container__input");
        hexToRgb("#F0F0F0");
        //HEX -> RGB
        if(flag == 1) {
            setInputFormValue("output-value","(,,)");
        }
        else {
            setInputFormValue("output-value","#");
        }
    }
    //If user input unvalidated value
    else if(valid == false) {
        console.log("second");
        document.getElementById("input-value").classList.remove("container__form-container__input");
        document.getElementById("input-value").classList.add("non-valid");
        hexToRgb("#F0F0F0");
        //HEX -> RGB
        if(flag == 1) {
            setInputFormValue("output-value","(,,)");
        }
        else {
            setInputFormValue("output-value","#");
        }
    }
    //If user input validated value
    else if(valid == true) {
        document.getElementById("input-value").classList.remove("non-valid");
        document.getElementById("input-value").classList.add("container__form-container__input");
        if(flag == 1) {
            hexToRgb(val);
        }
        else {
            rgbToHex(val);
        }
    }
}

function checkValidation(val) {
    let rex;
    //HEX -> RGB
    if(flag == 1) {
        rex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    }
    //RGB -> HEX
    else {
        rex = /\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/;
    }
    return rex.test(val);
}

function hexToRgb(hex) {
    var res = hex.split("#"); //remove hashtag(#)
    var val = res[1];
    var rgb = [0, 0, 0];
    var result;
    //#123, 3 digits hex code
    if(val.length == 3) {
        var r = val.slice(0,1) + val.slice(0,1);
        var g = val.slice(1,2) + val.slice(1,2);
        var b = val.slice(2,3) + val.slice(2,3);
        //console.log("R: " + r + " G: " + g + " B: " + b);

        r = parseInt('0x' + r, 16);
        g = parseInt('0x' + g, 16);
        b = parseInt('0x' + b, 16);
        //console.log("R: " + r + " G: " + g + " B: " + b);
        rgb = [r,g,b];
    }
    //#123456, 6 digits hex code
    else {
        var r = val.slice(0,2);
        var g = val.slice(2,4);
        var b = val.slice(4,6);
        //console.log("R: " + r + " G: " + g + " B: " + b);

        r = parseInt('0x' + r, 16);
        g = parseInt('0x' + g, 16);
        b = parseInt('0x' + b, 16);
        //console.log("R: " + r + " G: " + g + " B: " + b);
        rgb = [r,g,b];
    }
    result = "(" + r + ", " + g + ", " + b +")";
    document.getElementById("output-value").value = result;
    changeBackgroundColor(hex);
    changeFontColor(rgb);
}

function rgbToHex(rgb) {
    var res = rgb.replace("(","");
    res = res.replace(")","");
    var val = res.split(",");
    var r = val[0];
    var g = val[1];
    var b = val[2];
    var result;
    //console.log("R: " + r + " G: " + g + " B: " + b);

    r = Number(r).toString(16);
    g = Number(g).toString(16);
    b = Number(b).toString(16);
    //console.log(r+","+g+","+b);

    if(r.length == 1) {
        r = '0' + r;
    }
    if(g.length == 1) {
        g = '0' + g;
    }
    if(b.length == 1) {
        b = '0' + b;
    }
    result = '#' + r + g + b;
    result = result.toUpperCase();
    document.getElementById("output-value").value = result;
    changeBackgroundColor(result);
    changeFontColor([val[0],val[1],val[2]]);
    //console.log(result.toUpperCase());
}

function changeBackgroundColor(hex) {
    document.body.style.backgroundColor = hex;
}

function setInputFormValue(idName, valueText) {
    document.getElementById(idName).value = valueText;
}

function changeFontColor(rgb) {
    //console.log("changeFontColor: " + rgb[0] +"," + rgb[1]+","+rgb[2]);
    var o = Math.round(((parseInt(rgb[0]) * 299) +
                      (parseInt(rgb[1]) * 587) +
                      (parseInt(rgb[2]) * 114)) / 1000);
    var fore = (o > 125) ? '#000000' : '#FFFFFF';

    document.querySelector('.container__title').style.color = fore;
    var objs = document.querySelectorAll("label");
    for(var i = 0 ; i < objs.length ; i++) {
        objs[i].style.color = fore;
    }
    // objs = document.querySelectorAll("input");
    // for(i = 0 ; i < objs.length ; i++) {
    //     objs[i].style.color = fore;
    // }
    objs = document.querySelectorAll(".arrow");
    for(i = 0 ; i < objs.length ; i++) {
        objs[i].style.color = fore;
    }  
    //document.querySelector(".fav-menu").style.color = fore;

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
        const palette = document.querySelector(".side-nav__container");
        const item = document.createElement("div");
        item.className = "side-nav__container__item"
        item.innerHTML = `
            <p class="side-nav__container__item__delete">&times;</p>
            <div class="side-nav__container__item__data">
                <p>${color.hex}</p>
                <p>RGB${color.rgb}</p>
                <p class="side-nav__container__item__data__name">${color.name}</p>
            </div>
        `;
        item.setAttribute('style',`background-color: ${color.hex}`);
        //console.log(color.hex);
        palette.appendChild(item);
    }

    static deleteColor(el) {
        if(el.classList.contains('side-nav__container__item__delete')) {
            var check = confirm("Remove this color?");
            if(check) {
                el.parentElement.remove(); //??
                return 0;
            }
            return 1;
        }
        return -1;
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} mt-3`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const title = document.querySelector('.container__title');
        container.insertBefore(div, title);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 1500);
    }
}

//Store class: Handles storage(local Storage) 
class Store {
    static addColor(color) {
        const colors = Store.getColors();

        colors.push(color);

        localStorage.setItem('colors',JSON.stringify(colors));
    }

    static getColors() {
        let colors;
        if(localStorage.getItem('colors') == null) {
            colors = [];
        }
        else {
            colors = JSON.parse(localStorage.getItem('colors'));
        }

        return colors;
    }

    static removeColor(hex_fav) {
        const colors = Store.getColors();

        colors.forEach((color, index) => {
            //console.log("hex: "+ color.hex + ", hex_fav: " + hex_fav);
            if(color.hex === hex_fav) {
                colors.splice(index, 1);
            }
        });

        localStorage.setItem('colors',JSON.stringify(colors));
    }
}

//Event: display colors
document.addEventListener('DOMContentLoaded', UI.displayColors);

//Event: Add a color
document.querySelector(".btn-fav").addEventListener("click",(e) => {
    e.preventDefault();
    //Get color codes
    var hex_fav, rgb_fav, name_fav;
    //Save fav color
    if(checkValidation(document.getElementById("input-value").value) && document.getElementById("input-fav-color-name").value.length != 0) {
        if(flag == 1) {
            hex_fav = document.getElementById("input-value").value;
            rgb_fav = document.getElementById("output-value").value;
        }
        else if(flag == 0) {
            rgb_fav = document.getElementById("input-value").value;
            hex_fav = document.getElementById("output-value").value;
        }
        name_fav = document.getElementById("input-fav-color-name").value;
        //console.log(hex_fav + ":" + rgb_fav + ":" + name_fav);

        //Instatntiate color
        const color = new Color(hex_fav, rgb_fav, name_fav);

        //Add color to UI (palette)
        UI.addColorToPalette(color);

        //Add color to storage
        var result = Store.addColor(color);
        console.log(result);

        //Clear the form
        document.getElementById('hex2rgb-form').reset();
        document.getElementById('input-fav-color-name').value = "";

        UI.showAlert("Your favourite color has added to the Palette!",'success');
        changeBackgroundColor("#F0F0F0");
        changeFontColor([255,255,255]);
    }
    //If color name hasn't set yet
    else if(document.getElementById("input-fav-color-name").value.length == 0) {
        UI.showAlert("Please set the name of your favourite color!",'danger');
    }
    //If both HEX and RGB values are not valid
    else {
        UI.showAlert("Please check if HEX code or RGB code is valid or not.",'danger');
    }
});

//Event: Remove a color
document.querySelector('.side-nav__container').addEventListener('click', (e) => {
    //Remove color from UI
    var status = UI.deleteColor(e.target);

    //Remove color from storage
    /*
            <p class="delete-color">&times;</p>
            <div class="fav-color-data">
                <p>${color.hex}</p>
                <p>${color.rgb}</p>
                <p class="fav-name">${color.name}</p>
            </div>
            */
    //console.log(e.target.nextSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.textContent);
    if(status === 0) {
        Store.removeColor(e.target.nextSibling.nextElementSibling.firstChild.nextElementSibling.firstChild.textContent);
        UI.showAlert("Color Removed!", 'success')
    }
});

//Event: Toggle button
var checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener('change', function () {
    document.getElementById("input-value").value = "";
    document.getElementById("output-value").value = "";
    //HEX -> RGB
    if (checkbox.checked) {
        flag = 1;
        document.title = "HEX TO RGB";
        document.querySelector(".container__title-front").textContent = "HEX";
        document.querySelector(".container__title-back").textContent = "RGB";    
        document.getElementById('input-value-label').textContent = "HEX";
        document.getElementById('input-value').placeholder= '#4286F4';
        document.getElementById('output-value-label').textContent = "RGB";
        document.getElementById('input-value').maxLength="7"
    } 
    //RGB -> HEX
    else {
        flag = 0;
        document.title = "RGB TO HEX";
        document.querySelector(".container__title-front").textContent = "RGB";
        document.querySelector(".container__title-back").textContent = "HEX";
        document.getElementById('input-value-label').textContent = "RGB";
        document.getElementById('input-value').placeholder= '(66, 134, 244)';
        document.getElementById('output-value-label').textContent = "HEX";
        document.getElementById('input-value').maxLength="13"
    }
});