// test.js
// Запуск: node test.js

import axios from "axios";

const BASE_URL = "http://localhost:3000";
const TEST_USER = {
  email: "test.user@example.com",
  password: "password123",
};

const CONTACT = {
  name: "Ivan Petrov",
  email: "ivan.petrov@example.com",
  phone: "050-123-45-67",
};

(async () => {
  try {
    // 1) Register
    try {
      const reg = await axios.post(`${BASE_URL}/api/auth/register`, TEST_USER);
      console.log("REGISTER ✓", reg.status, reg.data);
    } catch (err) {
      console.log(
        "REGISTER ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 2) Login
    let token;
    try {
      const login = await axios.post(`${BASE_URL}/api/auth/login`, TEST_USER);
      console.log("LOGIN ✓", login.status, login.data);
      token = login.data.token;
    } catch (err) {
      console.log(
        "LOGIN ✗",
        err.response?.status,
        err.response?.data || err.message
      );
      return;
    }

    // 3) Current
    try {
      const current = await axios.get(`${BASE_URL}/api/auth/current`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("CURRENT ✓", current.status, current.data);
    } catch (err) {
      console.log(
        "CURRENT ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 4) Create contact
    let contactId;
    try {
      const create = await axios.post(`${BASE_URL}/api/contacts`, CONTACT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("CREATE CONTACT ✓", create.status, create.data);
      contactId = create.data.id;
    } catch (err) {
      console.log(
        "CREATE CONTACT ✗",
        err.response?.status,
        err.response?.data || err.message
      );
      return;
    }

    // 5) Get all contacts
    try {
      const list = await axios.get(`${BASE_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("LIST CONTACTS ✓", list.status, list.data);
    } catch (err) {
      console.log(
        "LIST CONTACTS ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 6) Get one contact
    try {
      const one = await axios.get(`${BASE_URL}/api/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("GET ONE ✓", one.status, one.data);
    } catch (err) {
      console.log(
        "GET ONE ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 7) Update contact (PUT)
    try {
      const updated = await axios.put(
        `${BASE_URL}/api/contacts/${contactId}`,
        { name: "Ivan P.", email: CONTACT.email, phone: CONTACT.phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("UPDATE (PUT) ✓", updated.status, updated.data);
    } catch (err) {
      console.log(
        "UPDATE (PUT) ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 8) Update favorite (PATCH)
    try {
      const fav = await axios.patch(
        `${BASE_URL}/api/contacts/${contactId}/favorite`,
        { favorite: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("PATCH FAVORITE ✓", fav.status, fav.data);
    } catch (err) {
      console.log(
        "PATCH FAVORITE ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 9) Delete contact
    try {
      const del = await axios.delete(`${BASE_URL}/api/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("DELETE ✓", del.status, del.data);
    } catch (err) {
      console.log(
        "DELETE ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 10) Logout
    try {
      const lo = await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("LOGOUT ✓", lo.status);
    } catch (err) {
      console.log(
        "LOGOUT ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
})();
