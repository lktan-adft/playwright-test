pipeline {
    agent {
        // Use the official Playwright Docker image. 
        // This avoids installing Node/Browsers manually on your Jenkins server.
        docker {
            label 'pine64' 
            image 'mcr.microsoft.com/playwright:v1.58.1-noble' 
            // Ensure this version matches your package.json version
            args '-u root' 
        }
    }

    parameters {
        // Dropdown to select environment (injects into process.env.TEST_ENV)
        choice(
            name: 'TEST_ENV', 
            choices: ['dev', 'staging', 'prod'], 
            description: 'Select the target environment (loads .env.<env>)'
        )
        // Dropdown to select which folder/category to run
        choice(
            name: 'TEST_CATEGORY',
            choices: ['all', 'e2e', 'api', 'smoke'],
            description: 'Select the test category folder to run'
        )
        // Checkbox for headless mode
        booleanParam(
            name: 'HEADLESS', 
            defaultValue: true, 
            description: 'Run tests in headless mode?'
        )
        string(name: 'DEVICE_IP', defaultValue: '192.168.1.100', description: 'Target Device IP Address')        
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Clean install based on package-lock.json
            }
        }

        stage('Run Playwright Tests') {
            environment {
                // Pass Jenkins params to system env variables
                BASE_URL = "Determined by .env file in config/" 
                // 2. Map the Jenkins param (params.DEVICE_IP) to an Env Var (TARGET_IP)
                // You can name the env var whatever you want Playwright to see
                TARGET_IP = "${params.DEVICE_IP}" 
            }                
            }
            steps {
                script {
                    // logic to decide command based on category selection
                    def testFolder = (params.TEST_CATEGORY == 'all') ? '' : "tests/${params.TEST_CATEGORY}"
                    
                    // Run the test command
                    // We pass TEST_ENV so playwright.config.ts knows which .env file to load
                    sh """
                        export TEST_ENV=${params.TEST_ENV}
                        export CI=true
                        npx playwright test ${testFolder} --reporter=html,junit
                    """
                }
            }
        }
    }

    post {
        always {
            // Publish the HTML report to Jenkins
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            // Publish JUnit results for the trend graph
            // temporary remove for testing
            // junit 'results.xml'
        }
    }
}
