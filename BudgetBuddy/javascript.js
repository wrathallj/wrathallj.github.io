/******************************************************************
 ************************Global Variables***************************
 ******************************************************************/
var curUser = JSON.parse(localStorage.getItem('storedUser')); // the current user data
var selectedExpense = '';


/******************************************************************
 ************************loadData***************************
 ******************************************************************/
function loadData() {

    // if it is a new user
    if (curUser == null) {
        curUser = new User();
        curUser.name = prompt("Please enter your name", "Harry Potter");
    }

    // set the html
    Food.innerHTML = "Food: " + curUser.expenses.Food;
    Transportation.innerHTML = "Transportation: " + curUser.expenses.Transportation;
    Fun.innerHTML = "Fun: " + curUser.expenses.Fun;
    Medical.innerHTML = "Medical: " + curUser.expenses.Medical;
    Clothing.innerHTML = "Clothing: " + curUser.expenses.Clothing;

    // put user data in storage
    localStorage.setItem('storedUser', JSON.stringify(curUser));
}

function AmountClick(button) {

    //trasition to the AmountPage
    document.querySelector("#MainPage").style.left = "-1000%";
    document.querySelector("#MainPage").style.position = "absolute";
    document.querySelector("#AmountPage").style.left = "0%";
    document.querySelector("#AmountPage").style.position = "relative";

    // choose the expense in which to apply the expense
    selectedExpense = button.id;

}

/******************************************************************
 ***********************SpendItClick***************************
 ******************************************************************/
function AddAmountClick(button) {
    // takes the string from the innerHTML
    var moneyStr = AmountSpent.innerHTML

    // remove the $
    moneyStr = moneyStr.replace('$', '');


    var moneySpent = parseInt(moneyStr);

    // Which Button did they press?
    switch (button.id) {
        case "25Button":
            moneySpent = moneySpent + 25;
            break;
        case "20Button":
            moneySpent = moneySpent + 20;
            break;
        case "50Button":
            moneySpent = moneySpent + 50;
            break;
        case "10Button":
            moneySpent = moneySpent + 10;
            break;
        case "5Button":
            moneySpent = moneySpent + 5;
            break;
        case "1Button":
            moneySpent = moneySpent + 1;
            break;
    }

    AmountSpent.innerHTML = moneySpent + '$';
}

/******************************************************************
 ***********************SpendButtonClick***************************
 ******************************************************************/
function SpendItClick(button) {
    // takes the string from the innerHTML
    var moneyStr = AmountSpent.innerHTML

    // remove the $
    moneyStr = moneyStr.replace('$', '');


    var spent = parseInt(moneyStr);
    // which part of the user data to update
    switch (selectedExpense) {
        case "Food":
            curUser.expenses.Food = curUser.expenses.Food - spent;
            break;
        case "Transportation":
            curUser.expenses.Transportation = curUser.expenses.Transportation - spent;
            break;
        case "Fun":
            curUser.expenses.Fun = curUser.expenses.Fun - spent;
            break;
        case "Medical":
            curUser.expenses.Medical = curUser.expenses.Medical - spent;
            break;
        case "Clothing":
            curUser.expenses.Clothing = curUser.expenses.Clothing - spent;
            break;
    }

    //turn object to string
    var userAsString = JSON.stringify(curUser);
    localStorage.setItem('storedUser', JSON.stringify(curUser));


    //trasition to the AmountPage
    document.querySelector("#MainPage").style.left = "0%";
    document.querySelector("#MainPage").style.position = "relative";
    document.querySelector("#AmountPage").style.left = "-1000%";
    document.querySelector("#AmountPage").style.position = "absolute";

    // set the html
    document.querySelector("#Food").innerHTML = "Food: " + curUser.expenses.Food;
    Transportation.innerHTML = "Transportation: " + curUser.expenses.Transportation;
    Fun.innerHTML = "Fun: " + curUser.expenses.Fun;
    Medical.innerHTML = "Medical: " + curUser.expenses.Medical;
    Clothing.innerHTML = "Clothing: " + curUser.expenses.Clothing;

}



/******************************************************************
 ***************************USER CLASS******************************
 ******************************************************************/
function User() {

    // initalize the name
    this.name = '';


    // initalize the groups array
    this.expenses = {
        'Food': 0,
        'Transportation': 0,
        'Fun': 0,
        'Medical': 0,
        'Clothing': 0,
    };

    // setter
    this.set = function set(user) {
        this.expenses.Food = curUser.expenses.Food;
        this.expenses.Transportation = user.expenses.Transportation;
        this.expenses.Fun = user.expenses.Fun;
        this.expenses.Medical = user.expenses.Medical;
        this.expenses.Clothing = user.expenses.Clothing;
    };

}