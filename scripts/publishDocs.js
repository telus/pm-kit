/* prettier-ignore */

const fetch = require('node-fetch')
const { execSync } = require('child_process')
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')

;(async () => {
  const commitSha = execSync('git rev-parse HEAD')
    .toString()
    .trim()
  const apiId = process.env.NETLIFY_API_ID
  const accessToken = process.env.NETLIFY_ACCESS_TOKEN
  let deployId = ''

  try {
    const deploysRes = await fetch(`https://api.netlify.com/api/v1/sites/${apiId}/deploys`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const deploys = await deploysRes.json()
    const deployment = deploys.find(d => d.commit_ref === commitSha)
    if (!deployment) {
      throw new Error(`Deployment with commit SHA ${commitSha} not found.`)
    }
    deployId = deployment.id
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

  const pollDeploy = setIntervalAsync(async () => {
    try {
      console.log('polling deploy...')
      const res = await fetch(`https://api.netlify.com/api/v1/sites/${apiId}/deploys/${deployId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const deploy = await res.json()
      const { state: currentStatus } = deploy
      console.log(`current deploy status: ${currentStatus}`)

      if (currentStatus !== 'building' || currentStatus !== 'uploading') {
        clearIntervalAsync(pollDeploy)
        if (currentStatus === 'ready') {
          const restoreRes = await fetch(`https://api.netlify.com/api/v1/sites/${apiId}/deploys/${deployId}/restore`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          const restoreResult = await restoreRes.json()
          console.log(`published at: ${restoreResult.published_at}`)
        } else {
          console.log(`deploy status is not on 'ready', instead it is '${currentStatus}'`)
          process.exit(1)
        }
      }
    } catch (error) {
      clearIntervalAsync(pollDeploy)
      console.log(error)
      process.exit(1)
    }
  }, 60000)
})()
