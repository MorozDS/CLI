const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  contactsRaw = await fs.readFile(contactsPath);
  contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const getContacts = contacts.find((contact) => contact.id === contactId);
  if (!getContacts) {
    return null;
  }
  return getContacts;
}

async function removeContact(contactId) {
  const id = contactId;
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contacts = await listContacts();
  contacts.push({ id, name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
