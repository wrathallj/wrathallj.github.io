/******************************************************************
 ************************Global Variables***************************
 ******************************************************************/
//localStorage.clear();
var curUser = JSON.parse(localStorage.getItem('storedUser')); // the current user data
var selectedExpense = '';
var isInAdjustmentMode = false;
var isInDeleteMode = false;

/******************************************************************
 ************************loadData**********************************
 ******************************************************************/
function loadData() {

    var userHasExpenses = false;
    var firstTimeUser = false;


    // if it is a new user
    if (curUser == null) {
        curUser = new User();
        curUser.name = prompt(" Welcome to Budget Buddy! Please enter your name", "Harry Potter");
        transitionClick("SettingsPage", "Open");
        window.alert("Be sure to add the different budget categories here.");
        firstTimeUser = true;
    }

    for (var key in curUser.expenses) {
        if (curUser.expenses[key] == null || curUser.expenses[key] == '') {
            break
        }
        userHasExpenses = true;
    }

    if (!(userHasExpenses) && !(firstTimeUser)) {
        //returning user with no expenses
        transitionClick("SettingsPage", "Open");
        window.alert("Welcome back " + curUser.name + " you really should start adding expenses to your budget!");

    }

    //add the different Expenses
    addCustomExpenses();

    // *****EVENTUALLY THE FEATURE WILL BE ADDED TO AUTO RESET BUDGET FOR NEW MONTH.  CHOICE WILL BE USERS******
    /*var tempDate = new Date();
    if (curUser.lastLoginMonth != tempDate.getMonth()) {
    }
    */
    // put user data in storage
    localStorage.setItem('storedUser', JSON.stringify(curUser));

}

/******************************************************************
 ************************transitionClick***************************
 ******************************************************************/
function transitionClick(destPage, button) {

    // array of the possible pages
    var pageArray = ["MainPage", "StatsPage", "SettingsPage", "AmountPage"];
    var isBudgetSetup = false;

    // go through all the pages
    for (var i = pageArray.length - 1; i >= 0; i--) {

        // the destination page will move in
        if (pageArray[i] == destPage) {
            document.querySelector('#' + destPage).style.left = "0%";
            document.querySelector('#' + destPage).style.position = "relative";

            // if it is the  amount page we will need to know the expense typ
            if ("AmountPage" == destPage) {
                selectedExpense = button.id;
                AmountSpent.innerHTML = '$0';
            }

            // all the rest of the pages will move out    
        } else {
            document.querySelector('#' + pageArray[i]).style.left = "-500%";
            document.querySelector('#' + pageArray[i]).style.position = "absolute";
        }

    };

    window.scrollTo(0, 0);

}
/******************************************************************
 ***********************ChangeOperationClick************************
 ******************************************************************/
function ChangeOperation(button) {
    if (button.innerHTML == '-') {
        button.innerHTML = '+';
    } else {
        button.innerHTML = '-';
    }
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

    if (document.querySelector("#ChangeOperation").innerHTML == '+') {
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
    } else {
        switch (button.id) {
            case "25Button":
                moneySpent = moneySpent - 25;
                break;
            case "20Button":
                moneySpent = moneySpent - 20;
                break;
            case "50Button":
                moneySpent = moneySpent - 50;
                break;
            case "10Button":
                moneySpent = moneySpent - 10;
                break;
            case "5Button":
                moneySpent = moneySpent - 5;
                break;
            case "1Button":
                moneySpent = moneySpent - 1;
                break;
        }

    }

    // determine if they are setting the budget, adding to their budget, or spending their budget
    if (isInAdjustmentMode) {
        document.querySelector("#SpendIt").innerHTML = "Set Budget";
    } else if (moneySpent > 0) {
        document.querySelector("#SpendIt").innerHTML = "Save It!";
    } else if (moneySpent <= 0) {
        document.querySelector("#SpendIt").innerHTML = "Spend It!";
    }

    AmountSpent.innerHTML = '$' + moneySpent;
}

/******************************************************************
 ***********************SpendButtonClick***************************
 ******************************************************************/
function SpendItClick(button) {
    // takes the string from the innerHTML
    var moneyStr = AmountSpent.innerHTML

    moneyStr = moneyStr.replace('$', '');

    if (isInAdjustmentMode) {

        // set the budget to the amount the user enters
        curUser.monthlyAllotment[selectedExpense] = parseInt(moneyStr);

        // change the html to the new budget
        document.querySelector("#" + selectedExpense).innerHTML = selectedExpense + ": $" + curUser.monthlyAllotment[selectedExpense]

        // move back to the main page
        transitionClick("MainPage", button);

    } else {
        // remove the $

        // take the money out!
        curUser.expenses[selectedExpense] -= parseInt(moneyStr);

        // set the html
        document.querySelector("#" + selectedExpense).innerHTML = selectedExpense + ": $" + curUser.expenses[selectedExpense]

        // move back to the main page
        transitionClick("MainPage", button);
    }

    //turn object to string and store
    localStorage.setItem('storedUser', JSON.stringify(curUser));

}

/******************************************************************
 **********************New Month Click*****************************
 ******************************************************************/
function NewMonth() {

    for (var key in curUser.expenses) {
        var test = curUser.monthlyAllotment[key];
        curUser.expenses[key] = curUser.monthlyAllotment[key];
        document.querySelector('#' + key).innerHTML = key + ': $' + curUser.monthlyAllotment[key];
    }

    //turn object to string and store
    localStorage.setItem('storedUser', JSON.stringify(curUser));
}

/******************************************************************
 **********************Add Category Click**************************
 ******************************************************************/
function AddCategoryClick(button) {

    var name = document.querySelector("#ButtonName").value;
    var amount = document.querySelector("#BudgetAmountEntered").value;

    if (document.getElementById(name) != null) {
        // checks to see if I have and element with users desired name
        window.alert("Sorry this expense name cannot be used.")
    } else if (name == null || name == '') {
        // checks if the name is blank
        window.alert("Please provide an expense name.")
    } else if (isNaN(amount)) {
        // checks to be sure they input a number
        window.alert("Please enter a integer without any symbols for the amount.");
    } else if (amount == null || amount == '') {
        // checks to be sure they have an amount input
        window.alert("Please enter the amount of money you want to allocate to this part of the budget.");
    } else {
        curUser.expenses[name] = amount;
        curUser.monthlyAllotment[name] = amount;
        addCustomExpenses();

        //clear out the input fields
        document.querySelector("#ButtonName").value = '';
        document.querySelector("#BudgetAmountEntered").value = '';

        // put user data in storage
        localStorage.setItem('storedUser', JSON.stringify(curUser));
    }


}

/******************************************************************
 **********************Add Category Click**************************
 ******************************************************************/
function DeleteExpense(button) {


    if (isInDeleteMode) {
        isInDeleteMode = false;

        for (var key in curUser.expenses) {
            document.querySelector('#' + key).style.color = 'white';

            // put the original function back on
            document.querySelector('#' + key).onclick = function() {
                transitionClick('AmountPage', this)
            };
        }

        //remove the finish button
        document.querySelector('#' + "FinishDelete").remove();

    } else {


        // if the button isn't already there we must create it
        var deleteButton = document.createElement("div");
        deleteButton.id = "FinishDelete";
        deleteButton.onclick = function() {
            DeleteExpense(this)
        }
        deleteButton.className = "button";
        //add the finish button
        deleteButton.innerHTML = "Finish Deleting Expenses";
        document.getElementById("MainPage").appendChild(deleteButton);



        for (var key in curUser.expenses) {
            document.querySelector('#' + key).style.color = 'red';
            document.querySelector('#' + key).onclick = function() {
                RemoveExpense(this)
            };
        }

        isInDeleteMode = true;

        transitionClick("MainPage", button);
    }
}

/******************************************************************
 **********************Remove Expense******************************
 ******************************************************************/
function RemoveExpense(button) {

    // remove all the html elements
    for (var key in curUser.expenses) {
        document.getElementById(key).remove();

    }

    document.getElementById("FinishDelete").remove();

    //remove from the array
    delete curUser.expenses[button.id];
    delete curUser.monthlyAllotment[button.id];

    // bring then all back again
    addCustomExpenses();

    //stay in delete mode
    isInDeleteMode = false;
    DeleteExpense(button);

    // put user data in storage
    localStorage.setItem('storedUser', JSON.stringify(curUser));
}

/******************************************************************
 **********************Clear Data Button************************
 ******************************************************************/
function ClearData() {
    localStorage.clear();

    location.reload();

}

/******************************************************************
 **********************Adjust Budget Button************************
 ******************************************************************/
function AdjustBudget(button) {

    var moneyStr;
    //if it is in adjust mode then put it back to normal
    if (isInAdjustmentMode) {
        isInAdjustmentMode = false;

        for (var key in curUser.expenses) {
            document.querySelector('#' + key).style.color = 'white';
            document.querySelector('#' + key).innerHTML = key + ': $' + curUser.expenses[key];
        }

        document.querySelector("#SpendIt").innerHTML = 'Spend It!';

        //remove the finish button
        document.querySelector('#' + "FinishAdjustments").remove();

    } else {
        if (document.getElementById(key) == null) {
            var adjustButton = document.createElement("div");
            adjustButton.id = "FinishAdjustments";
            adjustButton.onclick = function() {
                AdjustBudget(this)
            };

            adjustButton.className = "button";

            //add the finish button
            adjustButton.innerHTML = "Finish Budget Adjustments";
            document.getElementById("MainPage").appendChild(adjustButton);
        }

        document.querySelector("#SpendIt").innerHTML = 'Set Budget';
        for (var key in curUser.expenses) {
            document.querySelector('#' + key).style.color = 'green';
            document.querySelector('#' + key).innerHTML = key + ": $" + curUser.monthlyAllotment[key];
        }

        isInAdjustmentMode = true;
    }

    transitionClick("MainPage", button);


}

/******************************************************************
 **********************Add Custom Expenses*************************
 ******************************************************************/
function addCustomExpenses() {


    var customExpenses;

    for (var key in curUser.expenses) {

        //if the element isn't already on the page put it one 
        if (document.getElementById(key) == null) {
            customExpenses = document.createElement("div");
            customExpenses.id = key;
            customExpenses.onclick = function() {
                transitionClick('AmountPage', this)
            };

            customExpenses.className = "button";
            customExpenses.innerHTML = key + ": $" + curUser.expenses[key];
            document.getElementById("MainPage").appendChild(customExpenses);
        }
    }

}

/******************************************************************
 ***************************USER CLASS******************************
 ******************************************************************/
function User() {

    // initalize the name
    this.name = '';

    // keep track of the month
    var lastLogin = new Date();

    this.lastLoginMonth = lastLogin.getMonth();

    // initalize the expenses array
    this.expenses = {

    };

    this.monthlyAllotment = {

    };

}