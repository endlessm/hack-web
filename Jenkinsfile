pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
        }
    }

    environment {
        // Use the workspace as $HOME since that's the only guaranteed
        // writable place when running unprivileged.
        HOME = "${env.WORKSPACE}"

        // NPM can't be updated unprivileged, so silence the
        // notification.
        NPM_CONFIG_UPDATE_NOTIFIER = 'false'
    }

    stages {
        stage('Build') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Test') {
            steps {
                sh 'yarn test'
                sh 'yarn lint'
            }
        }
        stage('Publish') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                                  credentialsId: 'hack-computer-iam-user-jenkins-hack-web',
                                  accessKeyVariable: 'KEY',
                                  secretKeyVariable: 'SECRET']]) {
                    sh 'yarn build'
                    sh 'yarn deploy'
                }
            }
        }
    }
}
