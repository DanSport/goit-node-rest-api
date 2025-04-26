// test.js
// Запуск: node test.js

import axios from "axios";

const BASE_URL = "http://localhost:3000";
const TEST_USER = {
  email: "test.user@example.com",
  password: "password123",
};

const CONTACT1 = {
  name: "Ivan Petrov",
  email: "ivan.petrov@example.com",
  phone: "050-123-45-67",
};

const CONTACT2 = {
  name: "Maria Ivanova",
  email: "maria.ivanova@example.com",
  phone: "050-765-43-21",
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

    // 4) Update subscription
    try {
      const sub = await axios.patch(
        `${BASE_URL}/api/auth/subscription`,
        { subscription: "pro" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("SUBSCRIPTION UPDATE ✓", sub.status, sub.data);
    } catch (err) {
      console.log(
        "SUBSCRIPTION UPDATE ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 5) Create first contact
    let contact1Id;
    try {
      const create1 = await axios.post(`${BASE_URL}/api/contacts`, CONTACT1, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("CREATE CONTACT 1 ✓", create1.status, create1.data);
      contact1Id = create1.data.id;
    } catch (err) {
      console.log(
        "CREATE CONTACT 1 ✗",
        err.response?.status,
        err.response?.data || err.message
      );
      return;
    }

    // 6) Patch favorite for contact1
    try {
      const fav1 = await axios.patch(
        `${BASE_URL}/api/contacts/${contact1Id}/favorite`,
        { favorite: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("PATCH FAVORITE CONTACT 1 ✓", fav1.status, fav1.data);
    } catch (err) {
      console.log(
        "PATCH FAVORITE CONTACT 1 ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 7) Create second contact
    let contact2Id;
    try {
      const create2 = await axios.post(`${BASE_URL}/api/contacts`, CONTACT2, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("CREATE CONTACT 2 ✓", create2.status, create2.data);
      contact2Id = create2.data.id;
    } catch (err) {
      console.log(
        "CREATE CONTACT 2 ✗",
        err.response?.status,
        err.response?.data || err.message
      );
      return;
    }

    // 8) List contacts with pagination (page=1, limit=1)
    try {
      const listPage = await axios.get(
        `${BASE_URL}/api/contacts?page=1&limit=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("LIST PAGINATION ✓", listPage.status, listPage.data);
    } catch (err) {
      console.log(
        "LIST PAGINATION ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 9) Filter contacts by favorite=true
    try {
      const listFav = await axios.get(
        `${BASE_URL}/api/contacts?favorite=true`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("FILTER FAVORITE ✓", listFav.status, listFav.data);
    } catch (err) {
      console.log(
        "FILTER FAVORITE ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 10) Delete contact1
    try {
      const del1 = await axios.delete(
        `${BASE_URL}/api/contacts/${contact1Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("DELETE CONTACT 1 ✓", del1.status, del1.data);
    } catch (err) {
      console.log(
        "DELETE CONTACT 1 ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 11) Delete contact2
    try {
      const del2 = await axios.delete(
        `${BASE_URL}/api/contacts/${contact2Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("DELETE CONTACT 2 ✓", del2.status, del2.data);
    } catch (err) {
      console.log(
        "DELETE CONTACT 2 ✗",
        err.response?.status,
        err.response?.data || err.message
      );
    }

    // 12) Logout
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
