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
async function getContactById(contactId) {
  const contacts = await listContacts() 
  const filterContact = contacts.find( ( item ) => item.id === contactId ) 
  return filterContact || "Error: Not contacts in your list..."
}
//
async function removeContact(contactId) {
  const contacts = await listContacts();
  const deleteContact = contacts.filter( ( item ) => item.id !== contactId ) 
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
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
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}
//
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};