const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, "./db/contacts.json");

async function readDb() {
  const db = await fs.readFile(dbPath);
  return JSON.parse(db);
}

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  return await readDb();
}

async function getContactById(contactId) {
  const db = await readDb();
  const getDb = db.filter((contact) => contact.id === contactId);
  return getDb || null;
}

async function removeContact(contactId) {
  const db = await readDb();
  const updateDb = db.filter((contact) => contact.id !== contactId);

  await writeDb(updateDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readDb();
  db.push(contact);

  await writeDb(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
