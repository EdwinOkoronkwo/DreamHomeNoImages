const ClientService = require("../services/client.service");
const { isValidText, isValidEmail } = require("../util/validation");

class ClientController {
  static async getAllClients(req, res, next) {
    try {
      let clients = await ClientService.getAllClients();

      if (req.query.search) {
        clients = clients.filter((client) =>
          `${client.fname} ${client.lname}`
            .toLowerCase()
            .includes(req.query.search.toLowerCase())
        );
      }

      if (req.query.max) {
        const max = parseInt(req.query.max, 10);
        if (!isNaN(max)) {
          clients = clients.slice(0, max);
        }
      }

      res.json({ clients });
    } catch (error) {
      next(error);
    }
  }

  static async getClientById(req, res, next) {
    const { clientno } = req.params;
    try {
      const client = await ClientService.getClientById(clientno);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.json({ client });
    } catch (error) {
      next(error);
    }
  }

  static async deleteClient(req, res, next) {
    const { clientno } = req.params;
    try {
      await ClientService.deleteClient(clientno);
      res.status(204).send(); // No content to return
    } catch (error) {
      next(error);
    }
  }

  static async createClient(req, res, next) {
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
    } = req.body;

    let errors = {};
    if (!isValidText(fname)) errors.fname = "Invalid first name.";
    if (!isValidText(lname)) errors.lname = "Invalid last name.";
    if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const clientData = {
        clientno,
        fname,
        lname,
        telno,
        street,
        city,
        email,
        preftype,
        maxrent,
      };
      await ClientService.createClient(clientData);
      res.status(201).json({
        message: "Client created successfully",
        client: clientData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateClient(req, res, next) {
    const { clientno } = req.params;
    const { fname, lname, telno, street, city, email, preftype, maxrent } =
      req.body;

    let errors = {};
    if (!isValidText(fname)) errors.fname = "Invalid first name.";
    if (!isValidText(lname)) errors.lname = "Invalid last name.";
    if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const clientData = {
        clientno,
        fname,
        lname,
        telno,
        street,
        city,
        email,
        preftype,
        maxrent,
      };
      await ClientService.updateClient(clientno, clientData);
      res.status(200).json({
        message: "Client updated successfully",
        client: clientData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addOrUpdateClient(req, res, next) {
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
    } = req.body;

    console.log("Received data:", req.body);

    let errors = {};
    console.log("fname:", fname, "isValidText:", isValidText(fname));
    if (!isValidText(fname)) errors.fname = "Invalid first name.";

    console.log("lname:", lname, "isValidText:", isValidText(lname));
    if (!isValidText(lname)) errors.lname = "Invalid last name.";

    console.log("email:", email, "isValidEmail:", isValidEmail(email));
    if (!isValidEmail(email)) errors.email = "Invalid email.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ message: "Validation failed", errors });
    }

    try {
      const clientData = {
        clientno,
        fname,
        lname,
        telno,
        street,
        city,
        email,
        preftype,
        maxrent,
      };
      await ClientService.addOrUpdateClient(clientData);
      res.status(201).json({
        message: "Client created/updated successfully",
        client: clientData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClientController;
