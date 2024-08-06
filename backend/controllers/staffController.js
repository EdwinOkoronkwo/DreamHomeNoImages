const StaffService = require("../services/staff.service");
const {
  isValidText,
  isValidEmail,
  isValidDate,
} = require("../util/validation");

class StaffController {
  static async getAllStaffs(req, res, next) {
    try {
      let staffs = await StaffService.getAllStaffs();

      if (req.query.search) {
        staffs = staffs.filter((staff) =>
          `${staff.fname} ${staff.lname} ${staff.position}`
            .toLowerCase()
            .includes(req.query.search.toLowerCase())
        );
      }

      if (req.query.max) {
        const max = parseInt(req.query.max, 10);
        if (!isNaN(max)) {
          staffs = staffs.slice(0, max);
        }
      }

      res.json({ staffs });
    } catch (error) {
      next(error);
    }
  }

  static async getStaffById(req, res, next) {
    const { staffno } = req.params;
    try {
      const staff = await StaffService.getStaffById(staffno);
      if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
      }
      res.json({ staff });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStaff(req, res, next) {
    const { staffno } = req.params;
    try {
      await StaffService.deleteStaff(staffno);
      res.status(204).send(); // No content to return
    } catch (error) {
      next(error);
    }
  }

  static async createStaff(req, res, next) {
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
    } = req.body;

    let errors = {};
    if (!isValidText(fname)) errors.fname = "Invalid first name.";
    if (!isValidText(lname)) errors.lname = "Invalid last name.";
    if (!isValidText(position)) errors.position = "Invalid position.";
    if (!isValidDate(dob)) errors.dob = "Invalid date of birth.";
    if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const staffData = {
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
      };
      await StaffService.createStaff(staffData);
      res.status(201).json({
        message: "Staff created successfully",
        staff: staffData,
      });
    } catch (error) {
      next(error);
    }
  }

  // static async updateStaff(req, res, next) {
  //   // const { staffno } = req.params;
  //   // const {
  //   //   fname,
  //   //   lname,
  //   //   position,
  //   //   sex,
  //   //   dob,
  //   //   salary,
  //   //   branchno,
  //   //   telephone,
  //   //   mobile,
  //   //   email,
  //   //   image,
  //   // } = req.body;

  //   const staffno = req.params.staffno;
  //   const staffData = req.body;

  //   let errors = {};
  //   if (!isValidText(staffData.fname)) errors.fname = "Invalid first name.";
  //   if (!isValidText(staffData.lname)) errors.lname = "Invalid last name.";
  //   if (!isValidText(staffData.position)) errors.position = "Invalid position.";
  //   if (!isValidDate(staffData.dob)) errors.dob = "Invalid date of birth.";
  //   if (!isValidEmail(staffData.email)) errors.email = "Invalid email.";

  //   if (Object.keys(errors).length > 0) {
  //     return res.status(422).json({ message: "Validation failed", errors });
  //   }
  //   try {
  //     await StaffService.updateStaff(staffno, staffData);
  //     res.status(200).json({ message: "Staff updated successfully" });
  //   } catch (error) {
  //     console.error("Error updating staff:", error);
  //     res.status(500).json({ message: "Could not update staff" });
  //   }

  //   try {
  //     const staffData = {
  //       staffno,
  //       fname,
  //       lname,
  //       position,
  //       sex,
  //       dob,
  //       salary,
  //       branchno,
  //       telephone,
  //       mobile,
  //       email,
  //       image,
  //     };
  //     await StaffService.updateStaff(staffno, staffData);
  //     res.status(200).json({
  //       message: "Staff updated successfully",
  //       staff: staffData,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async updateStaff(req, res) {
    const staffno = req.params.staffno;
    const staffData = req.body;

    // Log the received data to the console
    console.log("Received update request for staff:", staffno);
    console.log("Received data:", staffData);

    try {
      await StaffService.updateStaff(staffno, staffData);
      console.log("Staff updated successfully");
      res.status(200).send({ message: "Staff updated successfully" });
    } catch (error) {
      console.error("Error updating staff:", error);
      res.status(500).send({ error: "Could not update staff" });
    }
  }

  static async addOrUpdateStaff(req, res, next) {
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
    } = req.body;

    console.log("Received data:", req.body);

    let errors = {};
    console.log("fname:", fname, "isValidText:", isValidText(fname));
    if (!isValidText(fname)) errors.fname = "Invalid first name.";

    console.log("lname:", lname, "isValidText:", isValidText(lname));
    if (!isValidText(lname)) errors.lname = "Invalid last name.";

    console.log("position:", position, "isValidText:", isValidText(position));
    if (!isValidText(position)) errors.position = "Invalid position.";

    console.log("dob:", dob, "isValidDate:", isValidDate(dob));
    if (!isValidDate(dob)) errors.dob = "Invalid date of birth.";

    console.log("email:", email, "isValidEmail:", isValidEmail(email));
    if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const staffData = {
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
      };
      await StaffService.addOrUpdateStaff(staffData);
      res.status(201).json({
        message: "Staff created/updated successfully",
        staff: staffData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StaffController;
