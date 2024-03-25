init()
const operations = ['a', 's', 'm', 'd'];
let reset = true;
let exp = "";
let result = 0;
const inputs = ['1','2','3','4','5','6','7','8','9','0','(',')','.'];
const commands = new Map([
    ['/', 'd'],
    ['*', 'm'],
    ['-', 's'],
    ['+', 'a'],
    ['=', 'e'],
    ['Enter', 'e'],
    ['Delete', 'ac'],
    ['Backspace', 'dd']
]);


/**
 * Initialize all calculator buttons with event listeners.
 */
function init() {
    let buttons = document.getElementsByClassName("calc-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons.item(i).addEventListener("click", function () {
            getInputs(this.id)
        });
    }

    document.addEventListener('keydown', function (event) {
        let key = event.key;
        if (commands.has(key))
        {
            getInputs(commands.get(key));
        } else if (inputs.includes(key))
        {
            getInputs(key);
        }
    });
}

/**
 * Process inputs from keypad.
 * @param val The value to add to the current register.
 */
function getInputs(val) {
    let display = document.getElementById("disp"); // Select the display box

    if (operations.includes(val)) // If the value passed in is one of the basic operators, flip reset to false, allowing the current register to be modified
    {
        reset = false;
    }

    switch (val)
    {
        case 'd': // Division
            display.innerHTML += " &div; ";
            exp += " / ";
            break;
        case 'm': // Multiplication
            display.innerHTML += " &times; ";
            exp += " * ";
            break;
        case 's': // Subtraction
            display.innerHTML += " - ";
            exp += " - ";
            break;
        case 'a': // Addition
            display.innerHTML += " + ";
            exp += " + ";
            break;
        case 'e': // Equals
            result = eval(exp);
            display.innerHTML = result;
            exp = result
            reset = true;
            break;
        case 'ac': // Clear all
            clear(display);
            exp = "";
            break;
        case 'dd':
            if (exp.length > 1)
            {
                display.innerHTML = backspace(display.innerHTML);
                exp = backspace(exp);
            }
            else
            {
                getInputs('ac')
            }
            break;
        default:
            if (reset) // If reset is enabled, clear everything before modifying register.
            {
                exp = "";
                display.innerHTML = "";
                reset = false;
            }
            display.innerHTML += val; // Display the value.
            exp += val
            break;
    }
}

/**
 * Clears given display.
 * @param display The display to be cleared.
 */
function clear(display) {
    display.innerHTML = "0";
    reset = true;
}

/**
 * Delete most recent character of string.
 * @param string The string to delete from.
 * @returns {string}
 */
function backspace(string) {
    let retstr = "";
    for (let i = 0; i < string.length - 1; i++)
    {
        retstr += string[i];
    }
    return retstr;
}