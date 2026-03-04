pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        ALLURE_RESULTS = "${WORKSPACE}/allure-results"
        PATH = "/usr/local/bin:$PATH"
    }

    stages {
        stage('Clean Previous Results') {
            steps {
                echo "Cleaning previous test results..."
                sh 'rm -rf ${ALLURE_RESULTS} allure-report'
                sh 'mkdir -p ${ALLURE_RESULTS}'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'node -v'
                sh 'npm -v'
                sh 'npm ci'
                echo "Installing Playwright browsers..."
                sh 'npx playwright install --with-deps'
                echo "Installing Allure Playwright reporter if missing..."
                sh 'npm install --save-dev allure-playwright || true'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                // Load environment variables from .env
                sh 'export $(cat .env | xargs) || true'
                
                // Run tests
                sh 'pwd'
                sh 'ls -la'
                sh 'npx playwright test --project=chromium'

                // Verify results folder
                sh 'ls -la ${ALLURE_RESULTS}'
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
        success {
            echo "✅ Playwright tests completed and Allure report generated successfully!"
        }
        failure {
            echo "❌ Some tests failed. Check Allure report for details."
        }
    }
}