<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :label="label"
          hide-details="auto"
          class="datainput justify-content-end align-self-center pb-1"
          dense
          outlined
          readonly
          :clearable="clearable"
          @click:clear="clearButtonClicked()"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {

  props: {
    label: String,
    clearable: Boolean,
    value: String // for v-model Binding
  },

  data() {
    return {
      menu: false,
      dateFormatted: null,
    }
  },

  computed: {
    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
  },

  watch: {
    value(val, prev){
      this.date = this.value;
      this.dateFormatted = new Date(this.value).toLocaleDateString(navigator.languages, { year: 'numeric', month: '2-digit', day: '2-digit' });
    },
  },

  mounted(){
    this.date = this.value;
    if(this.value != null){
      this.dateFormatted = new Date(this.value).toLocaleDateString(navigator.languages, { year: 'numeric', month: '2-digit', day: '2-digit' });
    }
  },

  methods: {
    clearButtonClicked(){
      this.date = null;
    }
  }
}
</script>
