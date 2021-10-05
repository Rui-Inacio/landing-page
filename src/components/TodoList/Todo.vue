<template>
  <div class="container">
    <div class="box">
      <b-dropdown expanded :triggers="['hover']" aria-role="list">
        <template #trigger>
          <b-button icon-right="chevron-down" expanded type="is-primary">
            {{ activeGroup.name }}
          </b-button>
        </template>
        <b-dropdown-item
          expanded
          @click="activeGroup = group"
          aria-role="listitem"
          v-for="(group, group_index) in groupList"
          :key="group_index"
          >{{ group.name }}</b-dropdown-item
        >
      </b-dropdown>

      <hr />

      <div v-if="activeGroup.todoList.length === 0">Add new Todo Item</div>

      <div v-else>
        <b-field
          grouped
          v-for="(item, item_index) in activeGroup.todoList"
          :key="item_index"
        >
          <ul>
            <li class="is-flex is-justify-content-space-around">
              <b-checkbox
                v-model="item.completed"
                @input="completeTodo(item)"
              ></b-checkbox>
              <span>
                <s v-if="item.completed">{{ item.text }}</s>
                <span v-else>{{ item.text }}</span>
              </span>

              <b-dropdown aria-role="list" class="ml-3">
                <template #trigger>
                  <b-button
                    class="is-small is-rounded"
                    icon-right="dots-horizontal"
                  />
                </template>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="archiveTodo(item, item_index, activeGroup)"
                >
                  Archive
                </b-dropdown-item>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="deleteTodo(item_index, activeGroup)"
                >
                  Delete
                </b-dropdown-item>
              </b-dropdown>
            </li>
          </ul>
        </b-field>
      </div>

      <hr />
      <form action="#" @keypress.enter.prevent="createTodo(activeGroup)">
        <b-field grouped>
          <b-input v-model="todo.text" expanded placeholder="New Todo..." />
          <b-button @click="createTodo(activeGroup)" class="is-primary"
            >Create</b-button
          >
        </b-field>
      </form>
    </div>
  </div>
</template>

<script>
import { Todo, Group } from "./Models";

export default {
  name: "Todo",

  data() {
    return {
      activeGroup: "",

      group: {
        name: "",
        color: "default",
        todoList: [],
      },
      groupList: [],

      todo: {
        text: "",
        completed: false,
        start: "",
        end: "",
        archived: false,
      },

      state: {
        activeGroup: "",
        groupList: [],
      },
    };
  },

  methods: {
    createGroup(groupName) {
      this.groupList.push(groupName);
    },

    deleteGroup(group_index) {
      this.groupList.splice(group_index, 1);
    },

    createTodo(group) {
      if (this.todo.text !== "") {
        let newTodo = new Todo(this.todo.text);
        newTodo.start = Date.now();

        let groupIndex = this.groupList.findIndex((item) => {
          return item.name === group.name;
        });

        this.groupList[groupIndex].todoList.push(newTodo);
        this.todo = new Todo("");
      }
    },

    completeTodo(todo) {
      todo.completed = true;
      todo.end = Date.now();
    },

    archiveTodo(todo, todo_index, group) {
      todo.archived = true;
      group.todoList.splice(todo_index, 1);
      let archiveGroup = this.groupList.find((item) => {
        return item.name === "Archived";
      });

      console.log(archiveGroup);

      if (archiveGroup) {
        archiveGroup.todoList.push(todo);
      }
    },

    deleteTodo(todo_index, group) {
      group.todoList.splice(todo_index, 1);
    },
  },

  created() {
    this.emptyGroup = Object.assign({}, this.group);
    this.emptyTodo = Object.assign({}, this.todo);

    if (!this.groupList.length) {
      let all = new Group("All");
      let archived = new Group("Archived");
      let deleted = new Group("Deleted");
      let todo = new Group("Todo");

      this.activeGroup = all;
      this.groupList.push(all);
      this.groupList.push(archived);
      this.groupList.push(deleted);
      this.groupList.push(todo);
    }
  },
};
</script>

<style lang="css" scoped>
</style>