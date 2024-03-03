import jwt from "jsonwebtoken";
import credentials from "./services/credentials";


function generateAccessToken(username: string) {
  console.log("Generating token for", username);
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET || "defaultSecret",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
}

export function registerUser(req: any, res: any) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .create(username, pwd)
      .then((creds) => generateAccessToken(creds.username))
      .then((token) => {
        res.status(201).send({ token: token });
      }).catch((error) => {
        res.status(500).send("Internal Server Error: " + error);
      }
      )
      
      ;
  }
}

export function loginUser(req: any, res: any) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials
      .verify(username, pwd)
      .then((goodUser: any) => generateAccessToken(goodUser))
      .then((token) => res.status(200).send({ token: token }))
      .catch((error) => res.status(401).send("Unauthorized"));
  }
}

export function authenticateUser(req: any, res: any, next: any) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log(authHeader);
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "defaultSecret",
      (error: Error | null, decoded: any) => {
        if (decoded) {
          console.log("Decoded token", decoded);
          next();
        } else {
          
          res.status(401).end();
        }
      }
    );
  }
}