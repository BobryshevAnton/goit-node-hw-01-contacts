const { Command } = require( "commander" ); 

const { listContacts,
    getContactById,
    removeContact,
   addContact,} = require( "./contacts.js" );
const { options } = require( "yargs" );

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
 
// const argv = require("yargs").argv;
//
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
    console.table(await listContacts())
      break;

    case "get":
      console.table(await getContactById(id))
      break;

     case "add":
      await addContact(name, email, phone);
      console.table(await listContacts());
      break;

    case "remove":
          await removeContact( id ) 
          console.table(await listContacts());
          
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);

// 1 Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// 2 Получаем контакт по id
// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

// 3 Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// 4 Удаляем контакт
// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH

 