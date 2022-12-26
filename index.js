const { listContacts, getContactById, addContact, removeContact } = require("./contacts");
const { program } = require('commander');

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            console.log('invoke list');
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case "get":
            console.log('invoke get');
            const contact = await getContactById(id);
            console.log(contact);
            break;

        case "add":
            console.log('invoke add');
            await addContact(name, email, phone);
            break;

        case "remove":
            console.log('invoke remove');
            await removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
