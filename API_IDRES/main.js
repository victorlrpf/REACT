import dotenv from "dotenv";

dotenv.config();

const url = process.env.urlbase;
const login = process.env.login;


const res = await fetch(`${url}${login}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(process.env.privatedkey)
});
if (!res.ok)
  throw new Error(`${res.statusText} ${res.status}`);

try {
  const tokeIdres = await res.text();
  const urlorder = process.env.urlorder;
  const queryParams = new URLSearchParams({
    // orderId: , // INT
    // statusId: , // INT
    statusDescription: "Aberto",
    // mktStatusDescription:'',
    // authenticationId: 0, //INT
  });

  const response = await fetch(`${url}${urlorder}?${queryParams}`, {
    headers: {
      "Authorization": `Bearer ${tokeIdres}`,
    }
  });

  const dados = await response.json();
  console.log(dados);
} catch (errors) {
  console.log(errors);
}
