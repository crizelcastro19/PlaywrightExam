pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        ALLURE_RESULTS = 'allure-results'
        PATH = "/usr/local/bin:$PATH"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'node -v'
                sh 'npm -v'
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                // Generates Allure results in allure-results folder
                sh 'npx playwright test'
            }
            post {
                always {
                    echo "Collecting test artifacts for Allure..."
                    // Copy screenshots & traces to allure-results folder if needed
                    sh 'mkdir -p ${ALLURE_RESULTS}/screenshots || true'
                    sh 'cp -r test-results/screenshots/* ${ALLURE_RESULTS}/screenshots/ || true'
                    sh 'cp -r test-results/traces/* ${ALLURE_RESULTS}/ || true'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Publishing Allure report in Jenkins..."
                allure includeProperties: false, results: [[path: "${ALLURE_RESULTS}"]]
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
    }
}