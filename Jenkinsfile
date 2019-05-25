pipeline {
  agent any
 
  stages {

    stage('Start'){
      steps {
        sh 'yarn install'
      }
    }

    stage('lint'){
      steps {
        sh 'yarn lint'
      }
    }

    stage('test'){
      steps {
        sh 'yarn test'
      }
    }
  
    stage('cucumber'){
      steps {
        sh 'yarn cucumber'
      }
    }
  
    stage('build'){
      steps {
        sh 'yarn build'
      }
    }

    stage('bundle'){
      steps {
        sh 'yarn bundle'
      }
    }
  
    stage('deploying'){
      steps {
        sh 'deploy:docker:linux'
      }
    }
  
  }
}
