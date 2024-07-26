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
      const [result] = await db.query("CALL sp_branch_create(?, ?, ?, ?)", [
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
      const [result] = await db.query("CALL sp_branch_update(?, ?, ?, ?)", [
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
}

module.exports = BranchService;
