const fs = require( 'fs' ).promises;
const { constants } = require( 'buffer' );
const { nanoid } = require( 'nanoid' );
const path = require( "path" ); 
const contactsPath = path.join( __dirname, "./db/contacts.json" );
//
async function listContacts () { 
  const contacts = await fs.readFile( contactsPath ) 
  return JSON.parse(contacts)
} 
 
 //
async function list () {
   const contacts = await fs.readFile( contactsPath) 
  try { 
   return JSON.parse(contacts); 
  } catch (err) {
    console.log("Error: Not contacts list...");
  }
}
// 
async function getContactById(contactId) {
  const contacts = await listContacts() 
  try {
    const filterContact = contacts.find( ( item ) => item.id === contactId );
    return filterContact 
  }catch (err) {
    console.log("Error: Not contacts in your list...");
  }
}
//
async function removeContact(contactId) {
  const contacts = await listContacts()
  try {
    const deleteContact = contacts.filter( ( item ) => item.id !== contactId ) 
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
  } catch (err){
    console.log(`Error: Unable to delete contact with ${contactId}...`);
  }
}
//
async function addContact(name, email, phone) {
  const contacts = await listContacts(); 
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }catch {
   console.log(`Error: Unable to added contact with ${newContact.name}...`);
   } 
}
//
module.exports = {
  list,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};