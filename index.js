const { Command } = require("commander");
const contactsOperation = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const contacts = await contactsOperation.listContacts();
        console.log(contacts);
      break;

    case "get":
        const contact = await contactsOperation.getContactById(id);
        if (!contact) {
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log(contact);
      break;

    case "add":
        const newContact = await contactsOperation.addContact({ name, email, phone });
        console.log(newContact);
      break;
    case "remove":
        const removeContact = await contactsOperation.removeContact(id);
        console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);