<template>

  <!-- TODO Finish auto save for notes -->

  <div class="container is-round">
    <div class="box">
      <div>
        <b-button @click="openNotes"> Notes </b-button>
        <div class="is-pulled-right">
          <form action="#" @keypress.enter.prevent="createNote">
            <b-field grouped>
              <b-input
                placeholder="New Note"
                v-model="note.title"
              ></b-input>
              <b-button @click="createNote">Create</b-button>
            </b-field>
          </form>
        </div>
      </div>

      <div v-if="isOpen">
        <hr />
        <b-tabs @input="changeActiveNote(activeTab)" type="is-boxed" v-model="activeTab">
          <b-tab-item
            v-for="(note, note_index) in noteList"
            :label="note.title"
            :icon="note.icon"
            :key="note_index"
          >
            
            <div class="box">
              <div v-if="note.title !== 'Notes'">
                <div class="is-flex is-align-items-center">

                  <div id="groupField">
                    <b-field grouped label-position="on-border" label="Note Title">
                      <b-input :disabled="!isEditing" maxlength="30" v-model="noteTitle"></b-input>
                    </b-field>
                  </div>

                  <div v-if="!isEditing">
                    <b-button @click="isEditing ? isEditing = false : isEditing = true" class="ml-3 borderless">
                      <b-icon icon="pencil-outline"></b-icon>
                    </b-button>
                    <b-button @click="deleteNote(note_index)" class="ml-3 borderless">
                      <b-icon icon="delete-outline"></b-icon>
                    </b-button>
                  </div>

                  <div v-else>
                    <b-button @click="editNote(note_index)" class="ml-3 borderless">
                      <b-icon icon="check"></b-icon>
                    </b-button>
                    <b-button @click="isEditing = false" class="ml-3 borderless">
                      <b-icon icon="close"></b-icon>
                    </b-button>
                  </div>
                  
                </div>
                <hr>
              </div> 

              <div id="editor" class="block">
                <ckeditor @newData="noteBodyChanged" :editorData="note.body"></ckeditor>
                {{note.body}}
              </div>  
            </div>

          </b-tab-item>
        </b-tabs>
      </div>
      
    </div>
  </div>
</template>

<script>

import CKEditor from './CKEditor.vue'

export default {
  components: {
    'ckeditor': CKEditor,
  },

  data() {
    return {

      isOpen: false,
      isEditing: false,
      noteTitle: '',

      note: {
        title: "",
        icon: "",
        body: "",
      },

      noteList: [],
      activeTab: 0,
      activeNote: {},

    };
  },

  methods: {

    openNotes() {
      
      if(this.isOpen){
        this.isOpen = false
      }else{
        this.isOpen = true
      }

    },

    editNote (note_index) {

      let title = this.noteTitle
      let note = this.noteList[note_index]
      note.title = title
      this.saveState()
      this.isEditing = false

    },

    deleteNote (note_index) {

      this.noteList.splice(note_index, 1)
      this.activeNote--
      this.saveState()

    },

    createNote () {

			let note = {
				title: this.note.title,
				icon: '',
				body: ''
			}

			this.note.title = ''
			this.noteList.push(note)
      this.saveState()

		},

    changeActiveNote (index) {
      this.activeNote = this.noteList[index]
      this.noteTitle = this.activeNote.title
    },

    noteBodyChanged (data) {
      
      this.activeNote.body = data
      let openNote = this.noteList.find(note => {
        return note.title === this.activeNote.title
      })
      
      openNote.body = data
      console.log(this.noteList);
      this.saveState()

    },

    saveState () {
      let stateJson = JSON.stringify(this.noteList)
      console.log("statetJson", stateJson);
      window.localStorage.setItem('notes-component', stateJson)
    },

    loadState () {
      let stateJson =  window.localStorage.getItem('notes-component')
      this.noteList = JSON.parse(stateJson)
      console.log("loadedState", this.noteList);
    },

  },

  created() {

    this.loadState()

    if (!this.noteList || !this.noteList.length) {
      let newNote = {
        title: "Notes",
        icon: null,
        body: "",
      };

      this.noteList.push(newNote);

    }

    this.activeNote = this.noteList[0]
    
  },
};
</script>

<style>
  .borderless {
    border: transparent;
  }
</style>