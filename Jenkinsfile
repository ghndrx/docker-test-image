pipeline {
	agent any
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred')
		SSH_CREDENTIALS=credentials('SSH-CREDENTIALS')
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
				node('any') {
					    def remote = [:]
  					    remote.name = 'ubuntu-kc'
  					    remote.host = '172.16.11.90'
  					    remote.user = 'greg'
  					    remote.password = 'Password1!'
  					    remote.allowAnyHosts = true
  					     // Provide a label for the Jenkins agent
					    writeFile file: 'run-pull-deploy.sh', text: 'docker pull aisthanestha/docker-test-image:latest &&
											docker stop docker-test-image &&
											docker rm docker-test-image &&
											docker run -d --name docker-test-image aisthanestha/docker-test-image:latest'
    					sshScript remote: remote, script: 'run-pull-deploy.sh'

					}
				}
			}
		
		}
	}

	post {
		always {
			node('any'){
				sh 'docker logout'
			}
		}
	}

}
