// register.js
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const user_name = document.getElementById("user_name").value.trim();
    const profile = document.getElementById("profile").files[0];

    var formdata = new FormData()
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("user_name", user_name);
    if (profile) {
      formdata.append("profile", profile);
    }

    try {
      const response = await fetch("api/register.php", {
        method: "POST",
        headers: { "Content-Type": "multipart/formdata" },
        body: formdata,
      });
      const result = await response.json();

      if (result.status === "success") {
        alert("Registration successful! You can now log in.");
        window.location.href = "login.html";
      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  });
