pipeline {
    agent {
        docker {
            image 'node:slim'
            // Need to run as root to install packages
            args '-u 0:0'
        }
    }
    stages {
        stage('Dependencies') {
            steps {
                sh 'apt-get update'
                sh 'apt-get -y install git flatpak-builder'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
                sh 'npm run lint'
            }
        }
        stage('Publish') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                                  credentialsId: 'hack-computer-iam-user-jenkins-hack-web',
                                  accessKeyVariable: 'KEY',
                                  secretKeyVariable: 'SECRET']]) {
                    sh 'npm run build'
                    sh 'npm run deploy'
                }
            }
        }
    }
}
