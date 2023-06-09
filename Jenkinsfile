pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred')
	}

	stages 

		stage('Build') {

			steps {
				sh 'docker build -t aisthanestha/docker-test-image:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push aisthanestha/docker-test-image:latest'
			}
		}

	// 	stage('Deploy') {
	// 		steps {
	// 			// Deploy to remote Docker host
	// 			sshagent(['ssh_creds']) {
	// 				sh "ssh -o StrictHostKeyChecking=accept-new administrator@172.16.11.90 'docker stop --name docker-test-image && docker pull aisthanestha/docker-test-image:latest && docker run -d -p 8082:80 --name docker-test-image:latest'"
	// 			}
	// 		}
	// 	}
	// }        
		stage('Pull and Deploy') 
			steps {
				// Send commands to remote Docker host via SSH
				script {
                    sshCommand remote: [
                        credentialsId: 'SSH_CREDENTIALS',
                        host: '172.16.11.90',
                        username: '172.16.11.90'
                    ], command: '''
                    docker pull aisthanestha/docker-test-image:latest
					docker stop docker-test-image 
					docker rm docker-test-image 
					docker run -d --name docker-test-image aisthanestha/docker-test-image:latest
				'''
				}
			}

	post {
		always {
			sh 'docker logout'
		}
	}
}

