const db = require("../db");

class ClientService {
  // Fetch all clients from the database
  static async getAllClients() {
    try {
      const [rows] = await db.query("SELECT * FROM dh_client");
      return rows;
    } catch (err) {
      console.error("Error fetching all clients:", err);
      throw err;
    }
  }

  // Fetch a single client by CLIENTNO
  static async getClientById(clientno) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM dh_client WHERE CLIENTNO = ?",
        [clientno]
      );
      if (rows.length === 0) {
        throw new Error(`No client with CLIENTNO ${clientno}`);
      }
      return rows[0];
    } catch (err) {
      console.error(`Error fetching client with CLIENTNO ${clientno}:`, err);
      throw err;
    }
  }

  // Delete a client by CLIENTNO
  static async deleteClient(clientno) {
    try {
      const [result] = await db.query(
        "DELETE FROM dh_client WHERE CLIENTNO = ?",
        [clientno]
      );
      if (result.affectedRows === 0) {
        throw new Error(`No client with CLIENTNO ${clientno} to delete`);
      }
      return result;
    } catch (err) {
      console.error(`Error deleting client with CLIENTNO ${clientno}:`, err);
      throw err;
    }
  }

  // Add or update a client using a stored procedure
  static async addOrUpdateClient(clientData) {
    try {
      const {
        clientno,
        fname,
        lname,
        telno,
        street,
        city,
        email,
        preftype,
        maxrent,
      } = clientData;

      const [result] = await db.query(
        "CALL sp_client_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [clientno, fname, lname, telno, street, city, email, preftype, maxrent]
      );
      return result;
    } catch (error) {
      console.error("Error adding or updating client:", error);
      throw error;
    }
  }
}

module.exports = ClientService;
