const db = require("../db");

class BranchService {
  static async getAllBranches() {
    try {
      const [rows] = await db.query("SELECT * FROM dh_branch");
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getBranchByBranchNo(branchno) {
    try {
      const [rows] = await db.query(
        "SELECT * FROM dh_branch WHERE branchno = ?",
        [branchno]
      );
      if (rows.length === 0) {
        throw new Error(`No branch with branchno ${branchno}`);
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async getBranchAddressByBranchNo(branchno) {
    try {
      const [rows] = await db.query("CALL get_branch_address_fn(?)", [
        branchno,
      ]);
      if (rows.length === 0) {
        throw new Error(`No branch with branchno ${branchno}`);
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async deleteBranch(branchno) {
    try {
      const [result] = await db.query(
        "DELETE FROM dh_branch WHERE branchno = ?",
        [branchno]
      );
      if (result.affectedRows === 0) {
        throw new Error(`No branch with branchno ${branchno}`);
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async createBranch(branchData) {
    try {
      const { branchno, street, city, postcode } = branchData;
      const [result] = await db.query("CALL new_branch_sp(?, ?, ?, ?)", [
        branchno,
        street,
        city,
        postcode,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateBranch(branchData) {
    try {
      const { branchno, street, city, postcode } = branchData;
      const [result] = await db.query(
        "CALL update_branch_details_sp(?, ?, ?, ?)",
        [branchno, street, city, postcode]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async isDuplicateBranchNo(branchno) {
    try {
      const query =
        "SELECT COUNT(*) as count FROM dh_branch WHERE branchno = ?";
      const [rows] = await db.query(query, [branchno]);
      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BranchService;
