<template>
  <div class="container is-round">
    <div class="box">
      <div>
        <b-button icon-left="note-multiple" @click="toggle"> Notes </b-button>
        <div class="is-pulled-right">
          <form action="#" @keypress.enter.prevent="createNote">
            <b-field grouped>
              <b-input
                placeholder="New Note Group"
                v-model="noteGroup.title"
              ></b-input>
              <b-button>Create</b-button>
            </b-field>
          </form>
        </div>
      </div>

      <div v-if="isOpen">
        <hr />
        <b-tabs type="is-boxed">
          <b-tab-item
            v-for="(notes, notes_index) in noteGroups"
            :label="notes.title"
            :icon="notes.icon"
            :key="notes_index"
          >
            <div id="editor">
              <ckeditor></ckeditor>
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

      noteGroup: {
        title: "",
        icon: "",
        body: "",
      },

      noteGroups: [],
    };
  },

  methods: {
    toggle() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },

    createNote () {

			let noteGroup = {
				title: this.noteGroup.title,
				icon: '',
				body: ''
			}

			this.noteGroup.title = ''
			this.noteGroups.push(noteGroup)

		},
  },

  created() {
    if (!this.noteGroups.length) {
      let newGroup = {
        title: "Notes",
        icon: null,
        body: "",
      };

      this.noteGroups.push(newGroup);
    }
  },
};
</script>

<style>
.roundButton {
  display: block;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border: 1px solid wheat;
  background-color: whitesmoke;
}
</style>