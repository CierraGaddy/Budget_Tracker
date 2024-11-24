/*This class for the budget tracker will hold the objects 
that will be utilized to execute the budget tracker funtion*/
class Budget {
  //This method holds the empty income and expense arrays and the budget starting at 0.
  constructor() {
    this.income = [];
    this.expenses = [];
    this.totalBudget = 0;
  }

  /*This method determinds if the input is income or 
  expense and adds it to the proper array.*/
  addBudget(type, description, amount) {
    if (type === "income") {
      this.income.push({ description, amount });
    } else if (type === "expense") {
      this.expenses.push({ description, amount });
    }
    this.updateBudget();
  }

  /*This method will update the UI with the proper total
   after the income and expenses are taken into account*/
  updateBudget() {
    let totalIncome = 0;
    let totalExpenses = 0;

    // This adds up the total income
    this.income.forEach((item) => {
      totalIncome += item.amount;
    });

    // This adds up the total expenses
    this.expenses.forEach((item) => {
      totalExpenses += item.amount;
    });

    // This shows the total after the expenses are taken from the income
    this.totalBudget = totalIncome - totalExpenses;

    // This returns result to display on the UI
    return {
      totalIncome,
      totalExpenses,
      totalBudget: this.totalBudget,
    };
  }

  // This method is to reset the arrays and update the UI to be 0
  resetBudget() {
    this.income = [];
    this.expenses = [];
    this.totalBudget = 0;
  }
}

const budget = new Budget();

// These variables will be referenced by the DOM elements
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const resetButton = document.getElementById("reset-btn");
const totalBudgetDisplay = document.getElementById("total-budget");
const totalIncomeDisplay = document.getElementById("total-income");
const totalExpensesDisplay = document.getElementById("total-expenses");

//  This function will update the UI when the page loads
function initializeApp() {
  updateUI();
}

// This adds an event listener to the Add button
addButton.addEventListener("click", function () {
  // This gets the input values
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  /* This validation will give an alert if the input is 
  invalid or the is empty in the description input*/
  if (!description || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid description and amount!");
    return;
  }

  // Add the transaction (income or expense) based on the selected type
  budget.addBudget(typeSelect.value, description, amount);

  // Update the UI and clear the input fields
  updateUI();
  clearInputs();
});

// This connects an event listener to the reset button
resetButton.addEventListener("click", function () {
  budget.resetBudget();
  updateUI();
  clearInputs();
});

// This will update the UI with the last budget inputs
function updateUI() {
  const { totalIncome, totalExpenses, totalBudget } = budget.updateBudget();

  totalBudgetDisplay.textContent = totalBudget.toFixed(2);
  totalIncomeDisplay.textContent = totalIncome.toFixed(2);
  totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
}

// This funtion will clear the input fields after adding or resetting data
function clearInputs() {
  descriptionInput.value = "";
  amountInput.value = "";
}
