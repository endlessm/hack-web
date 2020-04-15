pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'

            // In order to run the inklecate flatpak in bubblewrap's
            // sandbox, some of docker's sandboxing needs to be
            // turned off.
            // Also, the host user databases need to be available so
            // lookups of the unprivileged user work.
            args ('--cap-add=SYS_ADMIN --cap-add=NET_ADMIN --security-opt=seccomp=unconfined -v /etc/passwd:/etc/passwd:ro -v /etc/group:/etc/group:ro')
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
