<template>
	<div class="container">
		<div class="box">

			<b-dropdown expanded :triggers="['hover']" aria-role="list">
				<template #trigger>
					<b-button icon-right="chevron-down" expanded type="is-primary">
						{{ activeGroup.name }}
					</b-button>
				</template>
				<b-dropdown-item expanded @click="activeGroup = group" aria-role="listitem" v-for="(group, group_index) in groupList" :key="group_index">{{group.name}}</b-dropdown-item>
			</b-dropdown>

			<hr>

			<div v-if="activeGroup.todoList.length === 0">
				Add new Todo Item
			</div>

			<div v-else>
			<b-field grouped v-for="(item, item_index) in groupTodos" :key="item_index">
				<ul>
					<li class="is-flex is-justify-content-space-around">

						<b-checkbox v-model="item.completed" @input="completeTodo(item)"></b-checkbox>
						<span>
							<s v-if="item.completed">{{item.text}}</s>
							<span v-else>{{item.text}}</span>
						</span>

						<b-dropdown aria-role="list" class="ml-3">
              <template #trigger>
                <b-button class="is-small is-rounded" icon-right="dots-horizontal"/>
              </template>
              <b-dropdown-item aria-role="listitem" @click="archiveTodo(item, item_index, activeGroup)">
								Archive
							</b-dropdown-item>
              <b-dropdown-item aria-role="listitem" @click="deleteTodo(item_index, activeGroup)">
								Delete
							</b-dropdown-item>
            </b-dropdown>

					</li>
				</ul>
			</b-field>
			</div>

			<hr>
			<b-field grouped>
				<b-input v-model="todo.text" expanded placeholder="New Todo..."/>
				<b-button @click="createTodo(activeGroup)" class="is-primary">Create</b-button>
			</b-field>
		</div>

	</div>
</template>

<script>
export default {

	name: 'Todo',

	data () {
		return {

			activeGroup: '',

			group: {
				name: '',
				color: 'default',
				todoList: []
			},
			groupList: [],

			todo: {
				text: '',
				completed: false,
				start: '',
				end: '',
				archived: false
			},
			todoList: [],

			emptyGroup: {},
			emptyTodo: {},

			state: {
				activeGroup: '',
				groupList: []
			}

		}
	},

	computed: {

		groupTodos () {
			return this.activeGroup.todoList
		}

	},

	methods: {

		createGroup (groupName) {

			this.groupList.push(groupName)

		},

		deleteGroup (group_index){

			this.groupList.splice(group_index, 1) 		

		},

		createTodo (group) {

			if(this.todo.text !== ''){
				let newTodo = Object.assign({}, this.todo)
				const emptyTodo = Object.assign({}, this.emptyTodo)
				newTodo.start = Date.now()
				group.todoList.push(newTodo)
				console.log(this.emptyTodo);
				this.todo = emptyTodo
			}

		},

		completeTodo(todo){
			todo.completed = true
			todo.end = Date.now()
		},

		archiveTodo (todo, todo_index, group) {

			todo.archived = true
			group.todoList.splice(todo_index, 1)
			let archiveGroup = this.groupList.find(group => group.name === 'Archived')
			if(archiveGroup > -1){
				archiveGroup.todoList.push(todo)
			}

		},

		deleteTodo (todo_index, group) {

			group.todoList.splice(todo_index, 1)

		},

  },

  created () {

		this.emptyGroup = Object.assign({}, this.group)
		this.emptyTodo = Object.assign({}, this.todo)

		if(!this.groupList.length) {

			let all = Object.assign({}, this.group)
			all.name = 'All'
		
			let archived = Object.assign({}, this.group)
			archived.name = 'Archived'

			let deleted = Object.assign({}, this.group)
			deleted.name = "Deleted"

			let todo = Object.assign({}, this.group)
			todo.name = 'Todo'

			this.activeGroup = all
			this.groupList.push(all, archived, todo, deleted)

		}


  },

}
</script>

<style lang="css" scoped>
</style>