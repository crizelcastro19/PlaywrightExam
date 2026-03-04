pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        ALLURE_RESULTS = 'allure-results'
        PATH = "/usr/local/bin:$PATH"
    }

    stages {
        stage('Clean Previous Results') {
            steps {
                echo "Cleaning previous test results..."
                sh 'rm -rf ${ALLURE_RESULTS} allure-report'
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
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                // Generates Allure results in allure-results folder
                sh 'npx playwright test --project=chromium'
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
        success {
            echo "✅ Playwright tests completed and Allure report generated successfully!"
        }
        failure {
            echo "❌ Some tests failed. Check Allure report for details."
        }
    }
}