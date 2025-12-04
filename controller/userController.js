import { registerUser, loginUser } from "../services/userService.js";
import { validationResult } from "express-validator";

const loginGet = (req, res) => {
  res.render("user/login", {
    success: req.session.success || null,
    errors: req.session.errors || {},
    old: req.session.old || {},
    message: req.session.error || null,
  });

  req.session.success = null;
  req.session.errors = null;
  req.session.old = null;
  req.session.error = null;
};

const registerGet = (req, res) => {
  res.render("user/register", {
    errors: req.session.errors || {},
    old: req.session.old || {},
    message: req.session.error,
  });
  req.session.errors = null;
  req.session.old = null;
};

const registerPost = async (req, res) => {
  try {
    
    req.session.error = null;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((err) => (formattedErrors[err.path] = err.msg));

      req.session.errors = formattedErrors;
      req.session.old = req.body;

      return res.redirect("/registerPage");
    }

    const result = await registerUser(req.body);

    if (!result.status) {
      req.session.error = result.message;
      return res.redirect("/registerPage");
    }
    req.session.success = result.message;
    return res.redirect("/loginPage");
  } catch (err) {
    console.log(`err in register post`, err);
  }
};

const loginPost = async (req, res) => {
  try {
    req.session.error = null;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = {};
      errors.array().forEach((err) => (formattedErrors[err.path] = err.msg));

      req.session.errors = formattedErrors;
      req.session.old = req.body;

      return res.redirect("/loginPage");
    }

    const result = await loginUser(req.body);

    if (!result.status) {
      req.session.error = result.message;
      req.session.old = req.body;
      return res.redirect("/loginPage");
    }

    req.session.user = {
      id: result.user._id,
      name: result.user.userName,
      email: result.user.email,
    };
    req.session.success = result.message;
    return res.redirect("/home");
  } catch (err) {
    console.log(`err in loginPost`, err);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.send("Error Logging out");
      }
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  } catch (error) {
    console.log(`error from logot user ${error}`);
  }
};

const homeGet = async (req,res) => {
  try{
    console.log(req.session.user)
    res.render('user/home',{user : req.session.user.name})
  }catch(err){
    console.log(`err`,err)
  }
}

export default { loginGet, registerGet, registerPost, loginPost, logout ,homeGet};
