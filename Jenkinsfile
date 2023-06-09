pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-cred')
        SSH_CREDENTIALS = credentials('SSH_CREDENTIALS')
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t aisthanestha/docker-test-image:latest .'
            }
        }

        stage('Login') {
            steps {
                sh "echo '$DOCKERHUB_CREDENTIALS_PSW' | docker login -u '$DOCKERHUB_CREDENTIALS_USR' --password-stdin"
            }
        }

        stage('Push') {
            steps {
                sh 'docker push aisthanestha/docker-test-image:latest'
            }
        }

        stage('Pull and Deploy') {
            steps {
                script {
                    def remote = [:]
                    remote.name = 'ubuntu-kc'
                    remote.host = '172.16.11.90'
                    remote.user = 'greg'
                    remote.password = sshCredentials(credentialsId: 'SSH_CREDENTIALS', variable: 'SSH_PASSWORD')
                    remote.allowAnyHosts = true

                    writeFile file: 'run-pull-deploy.sh', text: '''
                        docker pull aisthanestha/docker-test-image:latest
                        docker stop docker-test-image
                        docker rm docker-test-image
                        docker run -d --name docker-test-image -p 8082:80 aisthanestha/docker-test-image:latest
                    '''

                    sshPut remote: remote, from: 'run-pull-deploy.sh', into: '/path/to/remote/directory/run-pull-deploy.sh'
                    sshCommand remote: remote, command: 'chmod +x /path/to/remote/directory/run-pull-deploy.sh && /path/to/remote/directory/run-pull-deploy.sh'
                }
            }
        }
    }

    post {
        always {
            node('any') {
                sh 'docker logout'
            }
        }
    }
}
