import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // next() - Do something and move on to the next
  try {
    //Check if the token is valid
    const token = req.headers.authorization.split(" ")[1]; // authorization : Bearer TOKEN

    let decodedData;
    console.log(process.env.JWT_SECRET_KEY)
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token with the secret key
      console.log(decodedData)
      req.userId = decodedData?.id;

      next();
    } else {
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Your session has expired. Please login again.",
      type: err.message,
    });
  }
};

export default auth;
