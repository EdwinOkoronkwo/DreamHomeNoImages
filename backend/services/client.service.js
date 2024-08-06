const db = require("../db");

class ClientService {
  static async getAllClients() {
    try {
      const [clients] = await db.query("SELECT * FROM dh_client");
      return clients;
    } catch (error) {
      console.error("Error fetching all clients:", error);
      throw error;
    }
  }

  static async getClientById(clientno) {
    try {
      const [clients] = await db.query(
        "SELECT * FROM dh_client WHERE clientno = ?",
        [clientno]
      );
      return clients[0];
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      throw error;
    }
  }

  static async createClient(clientData) {
    try {
      const [results] = await db.query(
        "CALL register_new_client_sp(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          clientData.clientno,
          clientData.fname,
          clientData.lname,
          clientData.telno,
          clientData.street,
          clientData.city,
          clientData.email,
          clientData.preftype,
          clientData.maxrent,
        ]
      );
      console.log("Stored procedure results:", results);
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  }

  static async updateClient(clientno, clientData) {
    try {
      await db.query("CALL update_client_sp(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        clientno,
        clientData.fname,
        clientData.lname,
        clientData.telno,
        clientData.street,
        clientData.city,
        clientData.email,
        clientData.preftype,
        clientData.maxrent,
      ]);
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  }

  static async deleteClient(clientno) {
    try {
      await db.query("DELETE FROM dh_client WHERE clientno = ?", [clientno]);
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  }

  static async addOrUpdateClient(clientData) {
    try {
      const [result] = await db.query(
        "CALL sp_client_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          clientData.clientno,
          clientData.fname,
          clientData.lname,
          clientData.telno,
          clientData.street,
          clientData.city,
          clientData.email,
          clientData.preftype,
          clientData.maxrent,
        ]
      );
      return result;
    } catch (error) {
      console.error("Error adding or updating client:", error);
      throw error;
    }
  }
}

module.exports = ClientService;
