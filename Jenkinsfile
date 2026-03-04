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
                echo "Cleaning previous results..."
                sh '''
                    rm -rf ${ALLURE_RESULTS} allure-report playwright-report
                    mkdir -p ${ALLURE_RESULTS}
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing Node.js dependencies..."
                sh 'node -v && npm -v && npm ci'
                echo "Installing Playwright browsers..."
                sh 'npx playwright install --with-deps'
                echo "Installing Allure Playwright reporter if missing..."
                sh 'npm install --save-dev allure-playwright || true'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."

                // Ensure ALLURE_RESULTS is available to Node
                sh '''
                    export ALLURE_RESULTS=${ALLURE_RESULTS}
                    # Load .env variables if present
                    if [ -f .env ]; then export $(cat .env | xargs); fi
                    # Run Playwright tests
                    npx playwright test --project=chromium
                    # Debug: list Allure results
                    echo "Allure results folder content:"
                    ls -la ${ALLURE_RESULTS}
                '''
            }
        }

        stage('Publish Allure Report') {
            steps {
                echo "Publishing Allure report in Jenkins..."
                allure includeProperties: false, results: [[path: "${ALLURE_RESULTS}"]]
            }
        }
    }

    post {
        always {
            echo "Build finished."
        }
        success {
            echo "✅ Playwright tests completed and Allure report generated successfully!"
        }
        failure {
            echo "❌ Some tests failed. Check Allure report for details."
        }
    }
}