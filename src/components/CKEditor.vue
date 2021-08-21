<template>
  <div id="app">
    <ckeditor
      :ckeditor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {

  data() {
    return {
      editor: ClassicEditor,
			editorData: null,
      editorConfig: {}
    };
  },

  watch: {
    editorData(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.$emit("newData", newValue);
      }
    },
  },

	created () {

		console.log(this.editorData);
    this.editorData = this.editorInput

	},
};
</script>

<style>
</style>