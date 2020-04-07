pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
        }
    }

    environment {
        // This defaults to /.npm since $HOME is /, but that's not
        // writable by the unprivileged jenkins user.
        NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm"

        // NPM can't be updated unprivileged, so silence the
        // notification.
        NPM_CONFIG_UPDATE_NOTIFIER = 'false'
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
