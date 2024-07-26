const { json } = require("body-parser");
const BranchService = require("../services/branch.service");
const { isValidText, isValidPostcode } = require("../util/validation");

class BranchController {
  static async getAllBranches(req, res, next) {
    const { max, search } = req.query;
    try {
      let branches = await BranchService.getAllBranches();

      if (search) {
        branches = branches.filter((branch) =>
          `${branch.street} ${branch.city} ${branch.postcode}`
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      if (max) {
        branches = branches.slice(0, Number(max));
      }

      res.json({ branches });
    } catch (error) {
      next(error);
    }
  }

  static async getBranchByBranchNo(req, res, next) {
    const branchno = req.params.branchno;
    try {
      const branch = await BranchService.getBranchByBranchNo(branchno);
      res.json({ branch });
    } catch (error) {
      next(error);
    }
  }

  // controllers/branchController.js
  static async findBranchByBranchNo(req, res, next) {
    const { branchno } = req.query; // Use req.query for GET parameters

    console.log("Received branchno:", branchno); // Log to check

    try {
      const branch = await BranchService.getBranchByBranchNo(branchno);
      if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
      }
      res.json({ branch });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBranch(req, res, next) {
    const branchno = req.params.branchno;
    try {
      await BranchService.deleteBranch(branchno);
      res.json({ message: "Branch deleted successfully!" });
    } catch (error) {
      next(error);
    }
  }
  static async createBranch(req, res, next) {
    try {
      const { branchno, street, city, postcode } = req.body;

      // Validate branchno or other fields as needed

      const result = await BranchService.createBranch({
        branchno,
        street,
        city,
        postcode,
      });
      res.status(201).json(result); // Send a 201 status code for creation
    } catch (error) {
      console.error("Error creating branch:", error.message);
      next(error); // Pass the error to the error handling middleware
    }
  }

  static async updateBranch(req, res, next) {
    try {
      const { branchno } = req.params; // Extract branchno from route parameters
      const { street, city, postcode } = req.body;

      // Validate fields as needed

      const result = await BranchService.updateBranch({
        branchno,
        street,
        city,
        postcode,
      });
      res.status(200).json(result); // Send a 200 status code for update
    } catch (error) {
      console.error("Error updating branch:", error.message);
      next(error); // Pass the error to the error handling middleware
    }
  }

  // static async addOrUpdateBranch(req, res, next) {
  //   const { branchno, street, city, postcode } = req.body;

  //   let errors = {};

  //   if (!isValidText(street)) {
  //     errors.street = "Invalid street.";
  //   }

  //   if (!isValidText(city)) {
  //     errors.city = "Invalid city.";
  //   }

  //   if (!isValidPostcode(postcode)) {
  //     errors.postcode = "Invalid postcode.";
  //   }

  //   if (Object.keys(errors).length > 0) {
  //     return res.status(422).json({
  //       message: "Adding/updating the branch failed due to validation errors.",
  //       errors,
  //     });
  //   }

  //   try {
  //     const branchData = { branchno, street, city, postcode };
  //     await BranchService.addOrUpdateBranch(branchData);
  //     res.status(201).json({
  //       message: "Branch created/updated successfully",
  //       branch: branchData,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = BranchController;
