import * as contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    let favorite;
    if (req.query.favorite !== undefined) {
      if (req.query.favorite === "true") favorite = true;
      else if (req.query.favorite === "false") favorite = false;
      else throw HttpError(400, "favorite must be 'true' or 'false'");
    }

    const result = await contactsService.listContacts(ownerId, {
      page,
      limit,
      favorite,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContactById(id);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const owner = req.user.id;

    const newContact = await contactsService.addContact({
      ...req.body,
      owner,
    });

    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};
export const updateFavoriteStatus = async (req, res, next) => {
  try {
    
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const updated = await contactsService.updateStatusContact(id, req.body);

    if (!updated) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
