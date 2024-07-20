import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
let todos = []; // Initialize an empty array to store todos
let loop = true; // Boolean to control the loop execution
// Function to print a banner
const printBanner = (text) => {
    console.log(chalk.green(figlet.textSync(text, { horizontalLayout: 'full' })));
};
// Function to print a spaced-out message
const printMessage = (message) => {
    console.log(chalk.cyan(message));
};
// Async function to handle user input
async function run() {
    printBanner("TODO CLI");
    while (loop) {
        // Main menu prompt
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: chalk.yellow("What would you like to do?"),
                choices: [
                    "Add To-Do",
                    "View To-Dos",
                    "Delete To-Do",
                    "Exit"
                ]
            }
        ]);
        switch (action) {
            case "Add To-Do":
                // Prompt the user to input a todo item
                const { TODO } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "TODO",
                        message: chalk.blue("Add your schedule to the to-do list:")
                    }
                ]);
                // Add the todo item to the todos array
                todos.push(TODO);
                printMessage(`To-Do "${chalk.green(TODO)}" added.`);
                break;
            case "View To-Dos":
                // Display the current list of todos
                if (todos.length > 0) {
                    printMessage("Your to-do list:");
                    todos.forEach((todo, index) => {
                        console.log(`${chalk.magenta(index + 1)}. ${chalk.white(todo)}`);
                    });
                }
                else {
                    printMessage("No to-dos found.");
                }
                break;
            case "Delete To-Do":
                // Prompt the user to select a todo item to delete
                if (todos.length > 0) {
                    const { deleteIndex } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "deleteIndex",
                            message: chalk.red("Select a to-do item to delete:"),
                            choices: todos.map((todo, index) => ({ name: todo, value: index }))
                        }
                    ]);
                    // Remove the selected item from the todos array
                    const removed = todos.splice(deleteIndex, 1);
                    printMessage(`To-Do "${chalk.red(removed[0])}" deleted.`);
                }
                else {
                    printMessage("No to-dos available to delete.");
                }
                break;
            case "Exit":
                printMessage("Goodbye!");
                loop = false;
                break;
        }
    }
}
// Call the run function to start the program
run();
