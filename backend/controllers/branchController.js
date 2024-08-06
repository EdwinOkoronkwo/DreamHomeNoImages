const BranchService = require("../services/branch.service");
const {
  isValidText,
  isValidPostcode,
  isDuplicateKey,
} = require("../util/validation");

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
      if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
      }
      res.json({ branch });
    } catch (error) {
      next(error);
    }
  }

  static async findBranchByBranchNo(req, res, next) {
    const { branchno } = req.query;
    try {
      const branch = await BranchService.getBranchAddressByBranchNo(branchno);
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
    const { branchno, street, city, postcode } = req.body;

    let errors = {};
    if (!isValidText(street)) errors.street = "Invalid street.";
    if (!isValidText(city)) errors.city = "Invalid city.";
    if (!isValidPostcode(postcode)) errors.postcode = "Invalid postcode.";
    if (await BranchService.isDuplicateBranchNo(branchno)) {
      return res
        .status(422)
        .json({ errors: { branchno: "Branch number already exists" } });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const duplicate = await isDuplicateKey(branchno);
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Branch number already exists." });
      }

      const branchData = { branchno, street, city, postcode };
      await BranchService.createBranch(branchData);
      res.status(201).json({
        message: "Branch created successfully",
        branch: branchData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBranch(req, res, next) {
    const { branchno } = req.params;
    const { street, city, postcode } = req.body;

    let errors = {};
    if (!isValidText(street)) errors.street = "Invalid street.";
    if (!isValidText(city)) errors.city = "Invalid city.";
    if (!isValidPostcode(postcode)) errors.postcode = "Invalid postcode.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      // const duplicate = await isDuplicateKey(branchno);
      // if (duplicate) {
      //   return res
      //     .status(409)
      //     .json({ message: "Branch number already exists." });
      // }
      const branchData = { branchno, street, city, postcode };
      await BranchService.updateBranch(branchData);
      res.status(200).json({
        message: "Branch updated successfully",
        branch: branchData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addOrUpdateBranch(req, res, next) {
    const { branchno, street, city, postcode } = req.body;

    let errors = {};
    if (!isValidText(street)) errors.street = "Invalid street.";
    if (!isValidText(city)) errors.city = "Invalid city.";
    if (!isValidPostcode(postcode)) errors.postcode = "Invalid postcode.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "Adding/updating the branch failed due to validation errors.",
        errors,
      });
    }

    try {
      const duplicate = await isDuplicateKey(branchno);
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Branch number already exists." });
      }

      const branchData = { branchno, street, city, postcode };
      await BranchService.addOrUpdateBranch(branchData);
      res.status(201).json({
        message: "Branch created/updated successfully",
        branch: branchData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BranchController;
