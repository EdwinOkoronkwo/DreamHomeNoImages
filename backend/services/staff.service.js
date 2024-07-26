const db = require("../db");

class StaffService {
  // Fetch all staff members from the database
  static async getAllStaffs() {
    try {
      const [rows] = await db.query("SELECT * FROM dh_staff");
      return rows;
    } catch (err) {
      console.error("Error fetching all staff:", err);
      throw err;
    }
  }

  // Fetch a single staff member by staffno
  static async getStaffById(staffno) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM dh_staff WHERE staffno = ?",
        [staffno]
      );
      if (rows.length === 0) {
        throw new Error(`No staff with staffno ${staffno}`);
      }
      return rows[0];
    } catch (err) {
      console.error(`Error fetching staff with staffno ${staffno}:`, err);
      throw err;
    }
  }

  // Delete a staff member by staffno
  static async deleteStaff(staffno) {
    try {
      const [result] = await db.query(
        "DELETE FROM dh_staff WHERE staffno = ?",
        [staffno]
      );
      if (result.affectedRows === 0) {
        throw new Error(`No staff with staffno ${staffno} to delete`);
      }
      return result;
    } catch (err) {
      console.error(`Error deleting staff with staffno ${staffno}:`, err);
      throw err;
    }
  }

  // Add or update a staff member using a stored procedure
  static async addOrUpdateStaff(staffData) {
    try {
      const {
        staffno,
        fname,
        lname,
        position,
        sex,
        dob,
        salary,
        branchno,
        telephone,
        mobile,
        email,
        image,
      } = staffData;

      const [result] = await db.query(
        "CALL sp_staff_add_or_edit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          staffno,
          fname,
          lname,
          position,
          sex,
          dob,
          salary,
          branchno,
          telephone,
          mobile,
          email,
          image,
        ]
      );
      return result;
    } catch (error) {
      console.error("Error adding or updating staff:", error);
      throw error;
    }
  }
}

module.exports = StaffService;
