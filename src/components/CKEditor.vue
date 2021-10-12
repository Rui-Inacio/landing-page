<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @input="logData"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {

  props: {
    editorInput: {
      default: "",
      type: String
    },
  },

  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {}
    };
  },

  methods: {
    logData(){
      this.$emit("newData", this.editorData);
    }
  },

  created() {
    this.editorData = this.editorInput;
  }

};
</script>

<style>
</style>