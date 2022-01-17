const express = require("express");
const {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  withdraw,
  depositing,
  transferring,
  getUserByMoney,
  getllSortUsers
} = require("../controllers/userControllers");

const apiRouter = express.Router();

apiRouter.get("/users/statistics", getllSortUsers);

apiRouter.get("/users/:id", getUser);

apiRouter.get("/users/money/:amount", getUserByMoney);

apiRouter.get("/users", getAllUsers);

apiRouter.post("/users", addUser);

apiRouter.put("/users", editUser);

apiRouter.put("/users/withdraw", withdraw);

apiRouter.put("/users/depositing", depositing);

apiRouter.put("/users/transferring", transferring);

apiRouter.delete("/users/:id", deleteUser);

// export default apiRouter;
module.exports = apiRouter;
