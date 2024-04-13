import inquirer from "inquirer";
//as a boolean to control the to-do list & loop execution
let todos = []; // Initialize an empty array to store todos for push
let loop = true;
// Async function to handle user input
async function run() {
    while (loop) {
        // Prompt the user to input a todo item
        const { TODO } = await inquirer.prompt([
            {
                type: "input",
                name: "TODO",
                message: "Add your schedule to the to-do list:"
            }
        ]);
        // Add the todo item to the todos array
        todos.push(TODO);
        // Prompt the user if they want to add more todo
        const { addMore } = await inquirer.prompt([{
                type: "list",
                name: "addMore",
                message: "Do you want to add more if you forgot some or due to change off mind?",
                choices: ["Yes", "No"]
            }]);
        if (addMore === "No") {
            loop = false;
        }
    }
    if (todos.length > 0) {
        console.log("Your today scheduled to-do list:", todos.join(", "));
        todos.forEach(todo => {
            console.log;
        });
    }
    else {
        console.log("No to-do's found");
    }
}
// Call the run function to start the program
run();
