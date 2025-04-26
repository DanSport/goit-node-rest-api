import Contact from "../models/contact.js";

// Отримати всі контакти
export const listContacts = async (ownerId, { page = 1, limit = 20, favorite }) => {
  const where = { owner: ownerId };
  if (favorite !== undefined) {
    where.favorite = favorite;
  }
  const offset = (page - 1) * limit;

  const { rows, count } = await Contact.findAndCountAll({
    where,
    limit,
    offset,
    order: [["id", "ASC"]],
  });
  const totalPages = Math.ceil(count / limit);

  return {
    contacts: rows,
    page,
    limit,
    totalPages,
    total: count,
  };
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