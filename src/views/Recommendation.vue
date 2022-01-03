<template>
  <v-container fluid>
    <v-row><v-col><v-card>
    <v-card-title>Submit a Recommendation Letter</v-card-title>
    <v-card-subtitle>{{ applicantName }} requests that you write a recommendation letter for the Ross Mathematics Program. For full consideration, recommendation letters should be received before the end of March. Your letter should discuss the applicant's mathematical strengths and weaknesses, the applicant's ability to work with others, the applicant's persistence and willingness to take on challenges, and the applicant's maturity.  <!--Participants at the Ross Program will be living in a college dorm for more than one month.--></v-card-subtitle>

    <p></p>


    <v-list-item two-line v-if="!recommendation.submittedAt">
      <v-list-item-content>
        <v-list-item-title>
	  <v-file-input v-model="file" hint="Please upload this recommendation letter as a PDF file. Other file types might not be readable in the Ross Program's systems."  persistent-hint :label="`Your Recommendation Letter for ${applicantName}`"/>
	</v-list-item-title>
	<v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action @click="upload">
	<v-btn :disabled="!file" color="primary">
	  Upload
	  <v-icon right>mdi-upload</v-icon>
	</v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-card-text>
      <v-alert v-if="errorResponse && errorResponse.response && errorResponse.response.data" type="error">
	{{ errorResponse.response.data }}
      </v-alert>

      <v-alert v-if="recommendation.submittedAt"
	border="top"
	colored-border
	type="success"
	elevation="2"
	       >
	Your recommendation letter was received {{ recommendation.submittedAt | moment("from", "now") }}.  Thank you for taking the time to write a letter; your expert feedback enables us to better evaluate candidates for the Program.
      </v-alert>

      <v-alert
	border="top"
	colored-border
	type="info"
	elevation="2"
	>
	<strong>What is the Ross Mathematics Program?</strong>  The
	Ross Program, founded in 1957, is an intensive summer
	experience designed to encourage motivated pre-college
	students to explore mathematics. During those weeks, students
	are immersed in a world of mathematical discovery, instructed
	in the art of mathematical thinking, and inspired to discover
	that abstract ideas are valuable and important.
	Please visit <a href="https://rossprogram.org/">rossprogram.org</a>
	for more information about the Program.
      </v-alert>
    </v-card-text>

  </v-card></v-col></v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';

export default {
  computed: {
    applicantName: {
      get() {
	if (this.recommendation.application) {
	  if (this.recommendation.application.firstName && this.recommendation.application.lastName) {
	    return `${this.recommendation.application.firstName } ${ this.recommendation.application.lastName}`;
	  }
	  if (this.recommendation.application.firstName) {
	    return this.recommendation.application.firstName;
	  }
	}
	return 'An applicant';
      },
    },
  },

  data() {
    return {
      file: null,
      recommendation: {},
      errorResponse: null,
    };
  },

  methods: {
    upload() {
      const formData = new FormData();

      formData.append('file', this.file);

      const url = `/recommendations/${this.$route.params.id}/${this.$route.params.password}`;

      axios.put(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
	.then(
          (response) => {
            if (response.status === 200) {
              this.recommendation = response.data;
            } else {
	      this.errorResponse = response;
            }
          },
          (error) => {
	    this.errorResponse = error;
          },
	);
    },
  },

  mounted() {
    axios.get(`/recommendations/${this.$route.params.id}/${this.$route.params.password}`)
      .then(
        (response) => {
          if (response.status === 200) {
            this.recommendation = response.data;
          } else {
	    this.errorResponse = response;
          }
        },
        (error) => {
	  this.errorResponse = error;
        },
      );
  },
};
</script>
