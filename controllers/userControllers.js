const uniqid = require("uniqid");
const { parserClients, addClient, updateClient } = require("../utils/utils");

const path = "./json/data.json";

const getUser = (req, res) => {
  console.log('works');
  const usersData = parserClients(path);
  const { id } = req.params;
  try {
    if (usersData.users.find((user) => user.id === id) !== undefined) {
      res.send(usersData.users.find((user) => user.id === id));
    } else {
      throw new Error(`sorry ${id} is not found`);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const addUser = (req, res) => {
  const usersData = parserClients(path);
  const uniqId = uniqid();
  const { cash, credit } = req.body;
  try {
    if (cash >= 0 && credit >= 0) {
      const data = { id: uniqId.slice(uniqId.length / 2), cash, credit };
      usersData.users.push(data);
      addClient(usersData, path);
      res.send(`User has been added`);
    } else {
      throw new Error(
        `sorry somthing went wrong. Please try again and check you cash and credit`
      );
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const editUser = (req, res) => {
  const { id } = req.query;
  const { cash, credit } = req.body;
  try {
    if (checkUser(id)) {
      const data = updateDataUser(id, cash, credit);
      updateClient(data, path);
      res.send(`User With The Id ${id} Has Been Updated Successfully`);
    } else {
      throw new Error(`Sorry, The ID ${id} Doesnt Exists!`);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const deleteUser = (req, res) => {
  const usersData = parserClients(path);
  const { id } = req.params;
  try {
    if (checkUser(id)) {
      const newArr = usersData.users.filter((user) => id !== user.id);
      usersData.users = newArr;
      updateClient(usersData, path);
      res.send(`The User ${id} Has Been Deleted`);
    } else {
      throw new Error(`Sorry, The ID ${id} Doesnt Exists!`);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const getAllUsers = (req, res) => {
  const usersData = parserClients(path);
  res.send(usersData);
};

const withdraw = (req, res) => {
  const { id, withdraw } = req.body;
  try {
    if (checkUser(id)) {
      const client = findUser(id);
      if (client.credit - withdraw >= 0) {
        const newCredit = client.credit - withdraw;
        const newCash = client.cash + withdraw;
        const data = updateDataUser(id, newCash, newCredit);
        updateClient(data, path);
        res.send(`You Have ${newCredit} on you accaount`);
      } else {
        throw new Error("sorry not enough money");
      }
    } else {
      throw new Error(`sorry, no user with the id:${id} found`);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const depositing = (req, res) => {
  const { id, depositing } = req.body;
  try {
    if (checkUser(id)) {
      const client = findUser(id);
      if (client.cash - depositing >= 0) {
        const newCash = client.cash - depositing;
        const newCredit = client.credit + depositing;
        console.log(client.cash, "cash");
        console.log(client.credit, "credit");
        console.log("======");
        console.log(newCash, "newCash");
        console.log(newCredit, "newCredit");
        const data = updateDataUser(id, newCash, newCredit);
        updateClient(data, path);
        res.send(`You Have ${newCredit} on you accaount`);
      } else {
        throw new Error("Sorry, You Have not Enough Cash");
      }
    } else {
      throw new Error(`No User With The Id:${id} Has Been Found`);
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const transferring = (req, res) => {
  const { id, idToTransferring, amount } = req.body;
  try {
    if (checkUser(id) && checkUser(idToTransferring)) {
      const transmitter = findUser(id);
      const receiver = findUser(idToTransferring);
      if (transmitter.credit - amount >= 0) {
        transmitter.credit = transmitter.credit - amount;
        receiver.credit = receiver.credit + amount;
        let data = updateDataUser(id, transmitter.cash, transmitter.credit);
        updateClient(data, path);
        data = updateDataUser(idToTransferring, receiver.cash, receiver.credit);
        updateClient(data, path);
        res.send(
          `Transferring Was Successfully. ${id}, Your Balance Is ${transmitter.credit}. ${idToTransferring}, Balance Your Balance Is ${receiver.credit}.`
        );
      } else {
        throw new Error(`There Is Not Enough Money On ${id}`);
      }
    } else {
      throw new Error("Sorry, Please check the id's");
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const checkUser = (id) => {
  const usersData = parserClients(path);
  if (usersData.users.some((user) => user.id === id)) {
    return true;
  } else {
    return false;
  }
};

const findUser = (id) => {
  const usersData = parserClients(path);
  return usersData.users.find((user) => user.id === id);
};

const updateDataUser = (id, cash, credit) => {
  const usersData = parserClients(path);
  const data = usersData.users.filter((user) => {
    if (user.id === id) {
      user.cash = cash;
      user.credit = credit;
      return user;
    } else {
      return user;
    }
  });
  usersData.users = data;
  return usersData;
};

const getUserByMoney = (req, res) => {
  const usersData = parserClients(path);
  const { amount } = req.params;
  const data = usersData.users.filter((user) => {
    if (user.credit === +amount) {
      return user;
    }
  });
  try {
    if (data.length > 0) {
      res.send(data);
    } else {
      throw new Error("Sorry, No Users With That Amount Has Been Found");
    }
  } catch (err) {
    res.send(err.toString());
  }
};

const getllSortUsers = (req, res) => {
  const usersData = parserClients(path);
  try {
    if (usersData.users.length < 0) {
      throw new Error("Sorry, There Are No Users To Show");
    } else {
      res.send(usersData.users.sort((a, b) => b.credit - a.credit));
    }
  } catch (err) {
    res.send(err.toString());
  }

  // res.send()
};
module.exports = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  withdraw,
  depositing,
  transferring,
  getUserByMoney,
  getllSortUsers,
};
