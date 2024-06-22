export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      // const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         body: JSON.stringify(loginInfo),
//         headers: { "content-type": "application/json" },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         resolve({ data });
//       } else {
//         const err = await response.json();
//         reject({ err });
//       }
//     } catch (error) {
//       reject({ error });
//     }
//   });
// }
export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Sending login request with:", loginInfo);
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      console.error("Request error:", error);
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}
// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/users/" + update.id, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }
