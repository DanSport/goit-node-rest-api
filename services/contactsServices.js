import Contact from "../models/contact.js";

// Отримати всі контакти
export const listContacts = async () => {
  const contacts = await Contact.findAll();
  return contacts;
};

// Отримати контакт за ID
export const getContactById = async (id) => {
  const contact = await Contact.findByPk(id);
  return contact;
};

// Додати новий контакт
export const addContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};
// Видалити контакт за ID
export const removeContactById = async (id) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

// Оновити контакт за ID
export const updateContact = async (id, data) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};
// Нова функція для оновлення тільки поля favorite
export const updateStatusContact = async (id, { favorite }) => {
  const contact = await Contact.findByPk(id);
  if (!contact) return null;

  await contact.update({ favorite });
  return contact;
};