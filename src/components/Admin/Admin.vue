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
            <th>Administrator</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in completeUsers" :key="user.user_name">
            <td>{{ user.user_id }}</td>
            <td>{{ user.user_name }}</td>
            <td>{{ user.user_email }}</td>
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
      <input type="checkbox" id="isAdmin" v-model="newUser.users_is_admin" />
      <div class="button-container">
        <button type="submit" class="add-button"
          @click="addUser(user.user_name, user.user_email, user.user_password, user.users_is_admin)">Dodaj</button>
        <button @click="goToTheme" class="back-button">Nazad na Temu</button>
      </div>
    </form>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Prethodna</button>
      <span v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }"
        @click="goToPage(pageNumber)">{{ pageNumber }}</span>
      <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Sledeća</button>
    </div>
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
      currentPage: 1,
      perPage: 10,
      totalPages: 1,
    };
  },
  methods: {
    getUsers() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      axios
        .get("http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/svi_korisnici_admin?sid=" + localStorage.getItem("sid"))
        .then((response) => {
          console.log(response.data);
          console.log(this.completeUsers);
          this.completeUsers = response.data.users;



          this.totalPages = Math.ceil(this.completeUsers.length / this.perPage);

          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }

          const startIndex = (this.currentPage - 1) * this.perPage;
          const endIndex = startIndex + this.perPage;
          this.currentUsers = this.completeUsers.slice(startIndex, endIndex);
          console.log(this.currentUsers)
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateCurrentUsers() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      const uniqueUsersSet = new Set(this.completeUsers.map(user => user.user_id));
      const uniqueUsers = Array.from(uniqueUsersSet, user_id => this.completeUsers.find(user => user.user_id === user_id));
      this.currentUsers = uniqueUsers.sort((a, b) => a.user_id - b.user_id).slice(startIndex, endIndex);

      this.currentUsers = uniqueUsers.slice(startIndex, endIndex);

      console.log(this.currentUsers);


    },

    deleteUser(user_id) {
      console.log(`Brisanje korisnika`);
      axios
        .post(`http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/delete_korisnika?sid=${localStorage.getItem("sid")} `, { user_id })


        .then((response) => {
          console.log("Korisnik uspešno izbrisan");
          this.getUsers();
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addUser(user_name, user_email, user_password, users_is_admin) {
      console.log("Dodavanje novog korisnika:", this.newUser);
      axios
        .post('http://134u123.e2.mars-hosting.com/project_quiz/log_reg/admin/add_korisnika', {
          user_name: this.newUser.user_name,
          user_email: this.newUser.user_email,
          user_password: this.newUser.user_password,
          users_is_admin: this.newUser.users_is_admin ? 1 : 0,
        })
        .then(() => {
          console.log("Korisnik uspešno dodat");
          this.getUsers(response.data.users);
          this.newUser = {
            user_name: "",
            user_email: "",
            user_password: "",
            users_is_admin: false,
          };
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goToTheme() {
      console.log("Prelazak na /thema");
      this.$router.push("/theme");
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getUsers();
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

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.pagination button,
.pagination span {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.pagination span.active {
  font-weight: bold;
}
</style>
