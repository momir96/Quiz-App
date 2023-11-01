<template>
  <div class="admin-panel">
    <h2>Admin Panel</h2>
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>ID korisnika</th>
            <th>Korisničko ime</th>
            <th>Email adresa</th>
            <th>Lozinka</th>
            <th>Administrator</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in completeUsers" :key="user.user_name">
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
            <td>{{ user.user_password }}</td>
            <td>{{ user.users_is_admin }}</td>
            <td>
              <button @click="deleteUser(user.user_id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form @submit.prevent="addUser">
  <input v-model="newUser.user_name" placeholder="Korisničko ime" required />
  <input v-model="newUser.user_email" placeholder="Email adresa" required />
  <input v-model="newUser.user_password" placeholder="Lozinka" required />
  <label for="isAdmin">Administrator:</label>
  <input type="checkbox" id="isAdmin" v-model="newUser.user_is_admin" />
  <div class="button-container">
    <button type="submit" class="add-button">Dodaj</button>
    <button @click="goToTheme" class="back-button">Nazad na Temu</button>
  </div>
</form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      completeUsers: [],
      newUser: {
        user_id: "",
        user_name: "",
        user_email: "",
        user_password: "",
        users_is_admin: false,
      },
      deleteUserId: "",
    };
  },
  methods: {
    getUsers() {
      axios
        .get("http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/svi_korisnici_admin")
        .then((response) => {
          console.log(response.data);
          const responseData = Array.isArray(response.data) ? response.data : Object.values(response.data);
          this.completeUsers = responseData.map((user) => ({
            user_id: user.user_id,
            user_name: user.user_name,
            user_email: user.user_email,
            user_password: user.user_password,
            users_is_admin: user.users_is_admin,
          }));
          console.log(this.completeUsers);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUser(userId) {
      console.log(`Brisanje korisnika`);
      axios
        .delete(`http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/delete_korisnika`, {
          params: {
            user_id: userId,
          },
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("Korisnik uspešno izbrisan");
          this.getUsers();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addUser() {
      console.log("Dodavanje novog korisnika:", this.newUser);
      axios
      .post("http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/add_korisnika", {
      // admin_email: "admin_email_value", // Promenite ovo sa stvarnom vrednošću
      // admin_password: "admin_password_value", // Promenite ovo sa stvarnom vrednošću
      user_name: this.newUser.user_name,
      user_email: this.newUser.user_email,
      user_password: this.newUser.user_password,
      users_is_admin: this.newUser.users_is_admin ? 1 : 0,
    })        
    .then(() => {
          console.log("Korisnik uspešno dodat");
          this.getUsers();
          this.newUser = {
            user_id: "",
            user_name: "",
            user_email: "",
            user_password: "",
            users_is_admin: false,
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goToTheme() {
      console.log("Prelazak na /tema");
      this.$router.push("/theme");
    },
  },
  mounted() {
    console.log("Komponenta montirana");
    this.getUsers();
  },
};
</script>

<style scoped>
.admin-panel {
  background-color: lightblue;
  padding: 20px;
  border-radius: 5px;
  height: 1000px;
}

.table-container {
  overflow-x: auto;
}

.user-table {
  margin: 30px 0;
  border-collapse: collapse;
  width: 100%;
}

.user-table th,
.user-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

.button-container {
  display: flex;
  gap: 8px;
}

.add-button,
.delete-button,
.back-button {
  color: black;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 5px;
}

.add-button:hover,
.delete-button:hover,
.back-button:hover {
  background-color: darkblue;
  color: white;
}

input {
  background-color: white;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
}
</style>
