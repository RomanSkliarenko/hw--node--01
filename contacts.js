const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");
function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    console.log("List of contacts: ");
    console.table(contacts);
  });
}

function getContactById(id) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => {
      if (contact.id === id) {
        console.log(`Get contact by ID ${id}:`);
        console.table(contact);
        return contact;
      }
    });

    if (contact === null) {
      console.log(`Contact "${id}" not found!`);
    }
  });
}

function removeContact(id) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    const newContact = contacts.filter((contact) => contact.id !== id);

    if (newContact.length === contacts.length) {
      console.log(
        `Contact with ID "${id}" don't removed! Contact "${id}" not found!`
      );
      return;
    }

    console.log("Contact deleted successfully! New list of contacts: ");
    console.table(newContact);

    fs.writeFile(contactsPath, JSON.stringify(newContact), (error) => {
      if (error) {
        return console.log("error :", error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    contacts.push({
      id: contacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    });

    console.log("Contacts added successfully! New lists of contacts: ");
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
