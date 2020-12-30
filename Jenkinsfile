pipeline {
  agent none

//   environment {
//     DOCKER_IMAGE = "nhtua/flask-docker"
//   }
  stages {
    stage("Test") {
      agent { node {label 'master'}}
      steps {
        sh "echo steps test"
      }
    }

    stage("build") {
      agent { node {label 'master'}}
      steps {
          sh "echo steps build"
      }
    }
  }
  post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
}
