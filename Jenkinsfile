pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
        }
    }
    stages {
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
