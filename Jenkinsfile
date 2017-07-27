#!groovy
properties(
	[[$class: 'BuildDiscarderProperty', strategy: 
		[$class: 'LogRotator', artifactDaysToKeepStr: '10', artifactNumToKeepStr: '10', daysToKeepStr: '10', numToKeepStr: '10']
	]])

node {
  timestamps {
    wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'XTerm']) {
      stage 'Checkout'
        sh 'rm -Rf .report .containers'
        checkout scm
        sh "./ci.sh stepCheckout"

      stage 'Build'
        sh './ci.sh stepBuild'

      stage 'Test'
        sh './ci.sh stepTest'

      stage 'Publish'
        sh './ci.sh stepPublish'
    }
  }
}
