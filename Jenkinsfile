pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred')
	}

	stages {

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
		stage('Pull and Deploy') {
			steps {
				// Send commands to remote Docker host via SSH
				withCredentials([usernamePassword(credentialsId: 'SSH_CREDENTIALS', usernameVariable: 'SSH_USERNAME', passwordVariable: 'SSH_PASSWORD')]) {
                    script {
                        def sshUsername = env.SSH_USERNAME
                        def sshPassword = env.SSH_PASSWORD

                    sh 'sshpass -p '${env.SSH_PASSWORD}' ssh ${env.SSH_USERNAME}@172.16.11.90 docker pull aisthanestha/docker-test-image:latest'
					sh 'sshpass -p '${env.SSH_PASSWORD}' ssh ${env.SSH_USERNAME}@172.16.11.90 docker stop docker-test-image || true'
					sh 'sshpass -p '${env.SSH_PASSWORD}' ssh ${env.SSH_USERNAME}@172.16.11.90 docker rm docker-test-image || true'
					sh 'sshpass -p '${env.SSH_PASSWORD}' ssh ${env.SSH_USERNAME}@172.16.11.90 docker run -d --name docker-test-image aisthanestha/docker-test-image:latest'
				
				}
			}
		}
	}
	post {
		always {
			sh 'docker logout'
		}
	}

}

