<template>
  <div class="container is-round">
    <div class="box">
      <div>
        <b-button @click="isOpen ? (isOpen = false) : (isOpen = true)">
          Notes
        </b-button>
        <div class="is-pulled-right">
          <form action="#" @keypress.enter.prevent="createNote">
            <b-field grouped>
              <b-input placeholder="New Note" v-model="newNote.title"></b-input>
              <b-button :disabled="!newNote.title" @click="createNote">Create</b-button>
            </b-field>
          </form>
        </div>
      </div>

      <div v-if="isOpen">
        <hr />
        <b-tabs type="is-boxed" v-model="activeTab" @input="changeActiveNote(activeTab)">
          <template v-for="(note, note_index) in noteList">
            <b-tab-item :label="note.title" :icon="note.icon" :key="note_index">
              <div class="box">
                <div v-if="note.title !== 'Notes'">
                  <div class="is-flex is-align-items-center">
                    <div id="groupField">
                      <b-field
                        grouped
                        label-position="on-border"
                        label="Note Title"
                      >
                        <b-input
                          :disabled="!isEditing"
                          maxlength="30"
                          v-model="note.title"
                        ></b-input>
                      </b-field>
                    </div>

                    <div v-if="!isEditing">
                      <b-button
                        @click="isEditing ? (isEditing = false) : (isEditing = true)"
                        class="ml-3 borderless"
                      >
                        <b-icon icon="pencil-outline"></b-icon>
                      </b-button>
                      <b-button
                        @click="deleteNote(note_index)"
                        class="ml-3 borderless"
                      >
                        <b-icon icon="delete-outline"></b-icon>
                      </b-button>
                    </div>

                    <div v-else>
                      <b-button @click="editNote()" class="ml-3 borderless">
                        <b-icon icon="check"></b-icon>
                      </b-button>
                      <b-button
                        @click="isEditing = false"
                        class="ml-3 borderless"
                      >
                        <b-icon icon="close"></b-icon>
                      </b-button>
                    </div>
                  </div>
                  <hr />
                </div>

                <div id="editor" class="block">
                  <ckeditor
                    @newData="noteBodyChanged"
                    :editorInput="note.body"
                  ></ckeditor>
                </div>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from "./CKEditor.vue";

export default {
  components: {
    ckeditor: CKEditor,
  },

  data() {
    return {
      isOpen: false,
      isEditing: false,

      newNote: {
        title: "",
        icon: "",
        body: "",
      },

      activeNote: {},
      noteList: [],
      activeTab: 0,
    };
  },

  methods: {
    createNote() {

      if(!this.newNote.title || this.newNote.title.trim() == ""){
        return;
      }

      let newNote = {
        title: this.newNote.title.trim(),
        icon: "",
        body: "",
      };

      this.newNote.title = "";
      this.noteList.push(newNote);
      this.saveState();
    },

    editNote() {
      this.saveState();
      this.isEditing = false;
    },

    deleteNote(note_index) {
      this.noteList.splice(note_index, 1);
			this.activeTab--;
      this.saveState();
    },

    changeActiveNote(index){
      this.activeNote = this.noteList[index];
    },

    noteBodyChanged(data) {
      this.activeNote.body = data;
      this.saveState();
    },

    saveState() {
      let stateJson = JSON.stringify(this.noteList);
      window.localStorage.setItem("notes-component", stateJson);
    },

    loadState() {
      let stateJson = window.localStorage.getItem("notes-component");
      this.noteList = JSON.parse(stateJson);
    },
  },

  created() {

    this.loadState();

    if (!this.noteList || !this.noteList.length) {
      let newNote = {
        title: "Notes",
        icon: null,
        body: "",
      };

      this.noteList = new Array();
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
