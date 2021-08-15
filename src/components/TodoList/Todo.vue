<template>
  <div class="container">
    <div class="box">

      <div class="is-flex is-justify-content-center is-align-items-center">

        <b-dropdown expanded :triggers="['hover']" aria-role="list">

          <template #trigger>
            <b-button icon-right="chevron-down" expanded type="is-primary">
              <b-icon class="mr-1" v-if="activeGroup.icon" :icon="activeGroup.icon" size="is-small"></b-icon>
              {{ activeGroup.name }}
            </b-button>
          </template>

          <b-dropdown-item
            expanded
            @click="changeActiveGroup(group)"
            aria-role="listitem"
            v-for="(group, group_index) in groupList"
            :key="group_index"
          >
            <span>
              <b-icon v-if="group.icon" :icon="group.icon" size="is-small"></b-icon>
              {{ group.name }}
            </span>

          </b-dropdown-item>

          <b-dropdown-item separator></b-dropdown-item>

          <b-dropdown-item focusable custom>
            <b-field grouped>
              <b-input icon-left="plus" v-model="group.name" @keypress.enter="createGroup" placeholder="New Group Name">New Group Name</b-input>
              <b-button class="is-primary" @click="createGroup" :disabled="!group.name">Create Group</b-button>
            </b-field>
          </b-dropdown-item>

        </b-dropdown>

        <b-icon class="is-pulled-right ml-3" size="is-medium" icon="cog-outline"></b-icon>

      </div>

      <hr />

      <div v-if="!activeGroup.todoList.length">
        This list is empty
      </div>

      <div v-else>
        <b-field
          grouped
          v-for="(item, item_index) in activeGroup.todoList"
          :key="item_index"
        >
          <ul>
            <li class="is-flex is-justify-content-space-around">
              <b-checkbox v-if="!item.deleted && !item.completed && !item.archived" v-model="item.completed" @input="completeTodo(item)"></b-checkbox>
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

                <b-dropdown-item aria-role="listitem" @click="archiveTodo(item, item_index, activeGroup)" 
                  v-show="activeGroup.name !== 'Archived' && activeGroup.name !== 'Deleted'">
                  Archive
                </b-dropdown-item>

                <b-dropdown-item aria-role="listitem" @click="unarchiveTodo(item, item_index, activeGroup)" 
                  v-show="activeGroup.name === 'Archived'">
                  Unarchive
                </b-dropdown-item>

                <b-dropdown-item aria-role="listitem" @click="deleteTodo(item, item_index, activeGroup)">
                  Delete
                </b-dropdown-item>

                <b-dropdown-item aria-role="listitem" @click="recoverTodo(item, item_index, activeGroup)" 
                  v-show="activeGroup.name === 'Deleted'">
                  Recover
                </b-dropdown-item>
              </b-dropdown>

            </li>
          </ul>
        </b-field>
      </div>

      <hr />
      <form action="#" @keypress.enter.prevent="createTodo(activeGroup)" v-if="activeGroup.name !== 'Deleted' && activeGroup.name !== 'Completed' && activeGroup.name !== 'Archived'">
        <b-field grouped>
          <b-input v-model="todo.text" expanded placeholder="New Todo..." />
          <b-button @click="createTodo(activeGroup)" class="is-primary">Create</b-button>
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
        icon: '',
        todoList: [],
      },
      groupList: [],

      todo: {
        text: "",
        completed: false,
        start: "",
        end: "",
        archived: false,
        deleted: false,
        deletionDate: "",
        group: "",
      },

      state: {
        activeGroup: "",
        groupList: [],
      },
    };
  },

  methods: {

		saveState () {

			this.state.activeGroup = this.activeGroup
			this.state.groupList = this.groupList
			let stateJson = JSON.stringify(this.state)
			window.localStorage.setItem('todo-state', stateJson)

		},

		async getSavedState () {

			let json = await window.localStorage.getItem('todo-state')
			let state = await JSON.parse(json)
			if(state){
				this.state = state
				this.groupList = state.groupList
				this.activeGroup = state.activeGroup
        console.log("Loaded state", state);
			}
      
		},

    createGroup () {

      let groupName = this.group.name
      let newGroup = new Group(groupName)

      this.groupList.push(newGroup);
			this.saveState()
      this.group.name = ''

    },

    deleteGroup (group_index) {

      this.groupList.splice(group_index, 1);
			this.saveState()

    },

    changeActiveGroup (group) {

      this.activeGroup = group
      this.saveState()
      
    },

    createTodo (group) {

      if (this.todo.text !== "") {
        let newTodo = new Todo(this.todo.text);
        newTodo.start = Date.now();
        newTodo.group = group.name

        let groupIndex = this.groupList.findIndex((item) => {
          return item.name === group.name;
        });

        this.groupList[groupIndex].todoList.push(newTodo);
        this.todo = new Todo("");
				this.saveState()
      }

    },

    completeTodo (todo) {

      todo.completed = true;
      todo.end = Date.now();
      let newTodo = new Todo("");
      newTodo = todo
      let completedGroup = this.groupList.find(group => {
        return group.name === 'Completed'
      })

      completedGroup.todoList.unshift(newTodo)
			this.saveState()

    },

    archiveTodo (todo, todo_index, group) {

      todo.archived = true;
      group.todoList.splice(todo_index, 1);
      let archiveGroup = this.groupList.find((item) => {
        return item.name === "Archived";
      });

      if (archiveGroup) {
        archiveGroup.todoList.push(todo);
      }

			this.saveState()

    },

    unarchiveTodo (todo, todo_index, group) {

      todo.archived = false
      group.todoList.splice(todo_index, 1)
      let todoGroup = this.groupList.find(gotoGroup => {
        return gotoGroup.name === todo.group
      })
      todoGroup.todoList.push(todo)

    },

    deleteTodo (todo, todo_index, group) {

      if(todo.deleted){
        group.splice(todo_index, 1)
        return
      }

      todo.deleted = true
      todo.deletionDate = Date.now()
      group.todoList.splice(todo_index, 1);
      let deletedGroup = this.groupList.find(group => {
        return group.name === 'Deleted'
      })
      deletedGroup.todoList.unshift(todo)
			this.saveState()

    },

    recoverTodo (todo, todo_index, group) {

      todo.delete = false
      todo.deletionDate = null
      group.todoList.splice(todo_index, 1)

      let todoGroup = this.groupList.find(item => {
        return item.name === todo.group
      })

      todoGroup.todoList.unshift(todo)

    }
  },

  async created() {

    this.activeGroup = new Group('')

		// await this.getSavedState()    

    if (!this.groupList.length) {
      let archived = new Group("Archived");
      let deleted = new Group("Deleted");
      let todo = new Group("Todo");
      let completed = new Group("Completed")

      todo.icon = 'note-multiple'
      completed.icon = 'check-bold'
      archived.icon = 'archive'
      deleted.icon = 'delete'

      this.activeGroup = todo;
      this.groupList.push(todo);
      this.groupList.push(completed)
      this.groupList.push(archived);
      this.groupList.push(deleted);
    }

  },
};
</script>

<style lang="css" scoped>
</style>